import {Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef} from '@angular/core';
import {App} from "@senstate/dashboard-connection";
import {Observable} from "rxjs";
import {ErrorData, LogData} from "@senstate/client";
import {HubService} from "../../state/hub.service";
import {filter, map} from "rxjs/operators";

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

  constructor (private hub: HubService,
               private cd: ChangeDetectorRef) {
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
    this.cd.markForCheck();
  }
}
