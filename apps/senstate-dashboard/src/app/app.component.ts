import {ChangeDetectionStrategy, Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {filter, map, pluck, shareReplay,} from 'rxjs/operators';
import {App, DASHBOARD_EVENT_NAMES, ErrorEvent, NetworkInfo} from '@senstate/dashboard-connection';
import {ActivatedRoute} from "@angular/router";
import {SocketService} from "./socket.service";
import {SocketEvent} from "@senstate/client-connection";
import {HubService} from "./state/hub.service";
import {MatSliderChange} from "@angular/material/slider";
import {Observable} from "rxjs";
import {ErrorData, LogData} from "@senstate/client";

@Component({
  selector: 'senstate-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  networkInterface$ = this.http.get<NetworkInfo[]>('/api/dash/interfaces').pipe(
    map(n => n.pop()),
    map(i => `http://${i.address}:3333/#/?mobile=true`)
  );


  public isMobile = false;

  // refactor..
  logObservablesByApp: {[key: string]: Observable<LogData[]>} = {};
  errorObservablesByApp: {[key: string]: Observable<ErrorData[]>} = {};

  mappedApps$ = this.hubService.app$;
  socketStatus$ = this.hubService.socketStatus$;
  watcherCount$ = this.hubService.watcherCount$;
  delayLabel = (num) => `${num} ms`;

  constructor (private http: HttpClient,
               private socketService: SocketService,
               private hubService: HubService,
               private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(q => {
      this.isMobile = q.has('mobile');
      console.info('params', q)
    });

    this.socketService.socket.socketEvents$.subscribe(value => {
      console.info('Socket event', value);
      switch (value) {
        case SocketEvent.Connected: {
          this.socketService.socket.sendJson(DASHBOARD_EVENT_NAMES.NEED_META, null);
          break;
        }
      }

      this.hubService.statusChanged(value);
    });
  }

  public getAppLogs$(appId: string) {
    return this.logObservablesByApp[appId] // cached
      || (this.logObservablesByApp[appId] = this.hubService.getLogs(appId).pipe(
      filter(logs => !!logs),
      map(logs => logs.map(l => l.data)),
      shareReplay(0)
    ));
  }

  public getAppErrors$(appId: string) {
    return this.errorObservablesByApp[appId] ||
      (this.errorObservablesByApp[appId] = this.hubService.getErrors(appId).pipe(
        filter(error => !!error),
        map(er => er.map(e => e.data)),
        shareReplay(0)
      ));
  }

  public trackByAppFunc (appObj: App) {
    return appObj.appId;
  }

  public trackByWatcherFunc (tagObj: any) {
    return tagObj.watchId;
  }

  getObjectLength (obj: {}) {
    return `${Object.keys(obj).length}`;
  }

  getValues <T>(obj: {[key: string]: T}) {
    return Object.values(obj);
  }

  changeDebounce ($event: MatSliderChange) {
    this.socketService.socket.sendJson(DASHBOARD_EVENT_NAMES.CHANGE_DEBOUNCE_TIME, $event.value);
  }
}
