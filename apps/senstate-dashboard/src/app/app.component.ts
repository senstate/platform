import {ChangeDetectionStrategy, Component, TrackByFunction} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {App, DASHBOARD_EVENT_NAMES, NetworkInfo} from '@senstate/dashboard-connection';
import {ActivatedRoute} from "@angular/router";
import {SocketEvent} from "@senstate/client-connection";
import {HubService} from "./state/hub.service";
import {MatSliderChange} from "@angular/material/slider";
import {MaterialCssVarsService} from "angular-material-css-vars";
import {SocketService} from "./services/socket.service";
import {version} from '../../../senstate/src/root-assets/package.json';
import {DebugToggleService} from "./services/debug-toggle.service";
import {SettingsService} from "./services/settings.service";


const SETTING_THEME = 'theme';

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

  version = version;

  public trackByAppFunc: TrackByFunction<App> = (index, item) => {
    return item.appId;
  };

  constructor (private http: HttpClient,
               private socketService: SocketService,
               private hubService: HubService,
               private route: ActivatedRoute,
               private settings: SettingsService,
               public materialCssVarsService: MaterialCssVarsService,
               public debugToggle: DebugToggleService) {
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

    this.darkTheme = this.settings.loadSetting(SETTING_THEME, true);
    this.applyTheme();
  }

  changeDebounce ($event: MatSliderChange) {
    this.socketService.socket.sendJson(DASHBOARD_EVENT_NAMES.CHANGE_DEBOUNCE_TIME, $event.value);
  }

  toggleTheme () {
    this.darkTheme = !this.darkTheme;
    this.settings.saveSetting(SETTING_THEME, this.darkTheme);
    this.applyTheme();
  }

  applyTheme() {

    this.materialCssVarsService.setDarkTheme(this.darkTheme);
  }

  addExampleData () {
    this.hubService.startExampleData();
  }
}
