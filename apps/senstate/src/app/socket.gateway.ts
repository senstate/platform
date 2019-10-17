import {BehaviorSubject, combineLatest, Subject} from 'rxjs';
import {AppMeta, CLIENT_CONSTS, ErrorData, LogData, WatchData, WatcherMeta} from '@senstate/client';
import {DASHBOARD_EVENT_NAMES, LogEvent, ErrorEvent} from '@senstate/dashboard-connection';
import {StateService} from "./state.service";

import * as WebSocket from 'ws';
import {ConnectedClient} from "./connectedClient";
import {auditTime, groupBy, mergeMap, skip, switchMap, takeUntil, tap, withLatestFrom} from "rxjs/operators";

interface EventType {
  event: string,
  data: any;
}

export class SocketGateway {
  private auditTime$ = new BehaviorSubject<number>(200);
  // TODO once everything is refactored to a shared action-object
  // push all actions through this
  private toDashboard$ = new Subject<EventType>();

  private events = new Subject<WatchData>();
  // private readonly logger = new Logger(SocketGateway.name);
  private readonly connected_clients: ConnectedClient[] = [];
  private readonly connected_dashboards: ConnectedClient[] = [];

  constructor (private state: StateService, private server: WebSocket.Server) {
    server.on('connection', (ws) => {
      const client = new ConnectedClient(ws);
      this.connected_clients.push(client);

      ws.on("close", () => {
        const clientIndex = this.connected_clients.indexOf(client);
        this.connected_clients.splice(clientIndex, 1);
        this.state.appDisconnected(client);
      });

      ws.on('message', (message) => {
        const receivedObject = JSON.parse(message.toString()) as EventType;
        const eventData = receivedObject.data;

        switch (receivedObject.event) {
          case CLIENT_CONSTS.ADD_APP: {
            this.addApp(client, eventData);
            break;
          }

          case CLIENT_CONSTS.INPUT_EVENT: {
            this.inputEvent(client, eventData);
            break;
          }

          case CLIENT_CONSTS.INPUT_LOG_EVENT: {
            this.inputLogEvent(client, eventData);
            break;
          }

          case CLIENT_CONSTS.INPUT_ERROR_EVENT: {
            this.inputErrorEvent(client, eventData);
            break;
          }

          case CLIENT_CONSTS.ADD_WATCHER: {
            this.addWatcher(client, eventData);
            break;
          }

          case DASHBOARD_EVENT_NAMES.NEED_META: {
            this.needMeta(client);
            break;
          }
          case DASHBOARD_EVENT_NAMES.CHANGE_DEBOUNCE_TIME: {
            console.info('Change Debounce Time to', receivedObject.data);
            this.auditTime$.next(receivedObject.data);
            break;
          }

          default: {
            // console.warn('UHM...');
            console.log('received unknown', receivedObject);
          }
        }

      });
    });

    this.afterInit();
  }

  afterInit () {
    this.auditTime$.pipe(
      tap(v => console.info('audit changed', v)),
      switchMap(auditTimeInterval =>
        this.events.pipe(
          takeUntil(this.auditTime$.pipe(
            skip(1),
            tap (v => console.info('stop events with previous auditTime')),
          )),
          groupBy(e => e.watchId),
          mergeMap((grouped) => grouped.pipe(
            auditTime(auditTimeInterval),
          )),
        )
      ),
      tap(item => {
        // console.info('sending', item);
        this.sendToDashboards(DASHBOARD_EVENT_NAMES.WATCHER_EVENTS, item);
      })
    ).subscribe();

    this.state.meta$.pipe(
      tap(meta => {
        this.sendToDashboards(DASHBOARD_EVENT_NAMES.META, meta);
      })
    ).subscribe();
  }

  sendToDashboards(event: string, data: any) {
    for (const dash of this.connected_dashboards) {
      if (dash.socket.readyState === WebSocket.OPEN) {
        dash.send(event, data);
      }
    }
  }

  inputEvent (client: ConnectedClient,  data: WatchData) {
    this.events.next(data);
  }

  inputLogEvent (client: ConnectedClient, data: LogData) {
    const appId = this.state.clientToApp[client.id];

    this.sendToDashboards(DASHBOARD_EVENT_NAMES.LOG, {
      appId,
      data
    } as LogEvent);
  }

  inputErrorEvent (client: ConnectedClient, data: ErrorData) {
    const appId = this.state.clientToApp[client.id];

    this.sendToDashboards(DASHBOARD_EVENT_NAMES.ERROR, {
      appId,
      data
    } as ErrorEvent);
  }


  addApp (client: ConnectedClient, data: AppMeta) {
    this.state.appConnected(client, data);
  }

  addWatcher (client: ConnectedClient, data: WatcherMeta) {
    this.state.addWatcher(client, data);
  }

  needMeta (client: ConnectedClient) {
    //this.logger.log(`Dashboard connected, sending meta`);
    this.state.dashboardNeedMeta(client);
    this.connected_dashboards.push(client);
  }
}
