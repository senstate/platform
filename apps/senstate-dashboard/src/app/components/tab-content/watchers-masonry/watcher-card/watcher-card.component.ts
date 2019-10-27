import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {HubService} from "../../../../state/hub.service";
import {Observable} from "rxjs";

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

  constructor(private hub: HubService) { }

  ngOnInit() {
    this.paused$ = this.hub.isWatcherPaused$(this.appId, this.watchId);
  }

  togglePaused () {
    this.hub.togglePaused(this.appId, this.watchId);
  }
}
