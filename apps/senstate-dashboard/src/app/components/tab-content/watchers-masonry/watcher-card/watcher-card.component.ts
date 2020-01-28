import {Component, OnInit, ChangeDetectionStrategy, Input, Directive, TemplateRef, ContentChild} from '@angular/core';
import {HubService} from "../../../../state/hub.service";
import {Observable} from "rxjs";

@Directive({
  selector: '[historyTemplate]'
})
export class HistoryTemplateDirective {

  constructor(public tpl: TemplateRef<any>) { }

}

@Component({
  selector: 'senstate-watcher-card',
  templateUrl: './watcher-card.component.html',
  styleUrls: ['./watcher-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WatcherCardComponent implements OnInit {
  @Input()
  public title: string;

  @Input()
  public showMenu: boolean;

  @Input()
  public watchId: string;
  @Input()
  public appId: string;

  public paused$: Observable<boolean>;

  @ContentChild(HistoryTemplateDirective, { static: true }) historyTemplateDir: HistoryTemplateDirective;

  get historyTemplate(): TemplateRef<any> {
    return this.historyTemplateDir && this.historyTemplateDir.tpl;
  }

  private lastValue: any;

  constructor(private hub: HubService) { }

  ngOnInit() {
    this.paused$ = this.hub.isWatcherPaused$(this.appId, this.watchId);
  }

  togglePaused () {
    this.hub.togglePaused(this.appId, this.watchId);
  }


}
