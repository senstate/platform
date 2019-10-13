import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap,} from 'rxjs/operators';
import {DASHBOARD_EVENT_NAMES, NetworkInfo} from '@senstate/dashboard-connection';
import {ActivatedRoute} from "@angular/router";
import {SocketService} from "./socket.service";
import {SocketEvent} from "@senstate/client-connection";
import {HubService} from "./state/hub.service";

@Component({
  selector: 'senstate-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  networkInterface$ = this.http.get<NetworkInfo[]>('/api/dash/interfaces').pipe(
    map(n => n.pop()),
    map(i => `http://${i.address}:3333/#/?mobile=true`)
  );


  public isMobile = false;

  mappedApps$ = this.hubService.app$;
  socketStatus$ = this.hubService.socketStatus$;
  watcherCount$ = this.hubService.watcherCount$;

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

  public getWatchData$(watchId: string) {
    return this.hubService.getWatcherData(watchId);
  }

  public getAppLogs$(appId: string) {
    return this.hubService.getLogs(appId);
  }

  public trackByAppFunc (appObj: any) {
    return appObj.app;
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
}
