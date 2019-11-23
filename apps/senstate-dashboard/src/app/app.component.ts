import {ChangeDetectionStrategy, Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {App, DASHBOARD_EVENT_NAMES, NetworkInfo} from '@senstate/dashboard-connection';
import {ActivatedRoute} from "@angular/router";
import {SocketEvent} from "@senstate/client-connection";
import {HubService} from "./state/hub.service";
import {MatSliderChange} from "@angular/material/slider";
import {MaterialCssVarsService} from "angular-material-css-vars";
import {SocketService} from "./services/socket.service";

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

  mappedApps$ = this.hubService.app$;
  socketStatus$ = this.hubService.socketStatus$;
  watcherCount$ = this.hubService.watcherCount$;
  delayLabel = (num) => `${num} ms`;

  darkTheme = true;

  constructor (private http: HttpClient,
               private socketService: SocketService,
               private hubService: HubService,
               private route: ActivatedRoute,
               public materialCssVarsService: MaterialCssVarsService) {
    this.route.queryParamMap.subscribe(q => {
      this.isMobile = q.has('mobile');
      console.info('params', q)
    });

    materialCssVarsService.setDarkTheme(true);
    const hex = '#8e24aa';
    this.materialCssVarsService.setPrimaryColor(hex);
    this.materialCssVarsService.setAccentColor('#C64BFF');

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

  public trackByAppFunc (appObj: App) {
    return appObj.appId;
  }




  getValues <T>(obj: {[key: string]: T}) {
    console.info('getValues call');
    return Object.values(obj);
  }

  changeDebounce ($event: MatSliderChange) {
    this.socketService.socket.sendJson(DASHBOARD_EVENT_NAMES.CHANGE_DEBOUNCE_TIME, $event.value);
  }

  toggleTheme () {
    this.darkTheme = !this.darkTheme;
    this.materialCssVarsService.setDarkTheme(this.darkTheme);
  }

  addExampleData () {
    this.hubService.startExampleData();
  }
}
