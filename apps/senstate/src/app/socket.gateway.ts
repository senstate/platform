import {combineLatest, Subject} from 'rxjs';
import {AppMeta, CLIENT_CONSTS, LogData, WatchData, WatcherMeta} from '@senstate/client';
import {DASHBOARD_EVENT_NAMES, LogEvent} from '@senstate/dashboard-connection';
import {StateService} from "./state.service";

import * as WebSocket from 'ws';
import {ConnectedClient} from "./connectedClient";
import {auditTime, groupBy, mergeMap, tap} from "rxjs/operators";

export class SocketGateway {
  private events = new Subject<WatchData>();
  private logEvents = new Subject<LogEvent>();
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
        const receivedObject = JSON.parse(message.toString());
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

          case CLIENT_CONSTS.ADD_WATCHER: {
            this.addWatcher(client, eventData);
            break;
          }

          case DASHBOARD_EVENT_NAMES.NEED_META: {
            this.needMeta(client);
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
    //const connectedDashboards = ;

        combineLatest([
          this.events.pipe(
            /*groupBy(e => e.watchId),
            tap(grouped => console.info('grouped', grouped)),
            mergeMap(grouped => grouped.pipe(
              auditTime(1000),
            )),*/
            tap(item => {
              // console.info('sending', item);
              this.sendToDashboards(DASHBOARD_EVENT_NAMES.WATCHER_EVENTS, item);
            })
          ),
          this.logEvents.pipe(
            tap(item => {
              this.sendToDashboards(DASHBOARD_EVENT_NAMES.LOG, item);
            })
          ),
          this.state.meta$.pipe(
            tap(meta => {
              this.sendToDashboards(DASHBOARD_EVENT_NAMES.META, meta);
            })
          )
        ])
          .subscribe();
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

    this.logEvents.next({
      appId,
      log: data.log
    });
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
