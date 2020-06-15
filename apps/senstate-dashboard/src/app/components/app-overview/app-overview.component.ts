import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnInit} from '@angular/core';
import {App} from "@senstate/dashboard-connection";
import {Observable} from "rxjs";
import {ErrorData, LogData} from "@senstate/client";
import {HubService} from "../../state/hub.service";
import {filter, map} from "rxjs/operators";
import {DebugToggleService} from "../../services/debug-toggle.service";
import {SettingsService} from "../../services/settings.service";

const SETTING_LIST_TYPE = 'list';
const SETTING_MAX_WIDTH = 'masonry_disable_max_width';

@Component({
  selector: 'senstate-app-overview',
  templateUrl: './app-overview.component.html',
  styleUrls: ['./app-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppOverviewComponent implements OnInit {

  @Input()
  public app: App;

  public logs$: Observable<LogData[]>;
  public errors$: Observable<ErrorData[]>;
  public autoSizeActive = false;

  public listType: string;

  @HostBinding('class.disconnected')
  public get appStyle() : boolean  {
    return this.app.disconnected;
  }

  constructor (private hub: HubService,
               private cd: ChangeDetectorRef,
               private settings: SettingsService,
               public debugToggle: DebugToggleService) {
    this.listType = settings.loadSetting(SETTING_LIST_TYPE, 'list');
    this.autoSizeActive = settings.loadSetting(SETTING_MAX_WIDTH, false);
  }

  ngOnInit () {
    this.logs$ = this.hub.getLogs$(this.app.appId).pipe(
      filter(logs => !!logs),
      map(logs => logs.map(l => l.data)),
    );

    this.errors$ = this.hub.getErrors$(this.app.appId).pipe(
      filter(error => !!error),
      map(er => er.map(e => e.data)),
    )
  }

  getObjectLength (obj: {}) {
    return `${Object.keys(obj).length}`;
  }

  toggleAutoSize () {
    this.autoSizeActive = !this.autoSizeActive;

    this.settings.saveSetting(SETTING_MAX_WIDTH, this.autoSizeActive);
    // this.cd.markForCheck();
    this.cd.detectChanges();
  }

  saveListType(newListType: any) {
    this.settings.saveSetting(SETTING_LIST_TYPE, newListType);
  }
}
