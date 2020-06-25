import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, TrackByFunction} from '@angular/core';
import {Observable} from "rxjs";
import {WatcherMeta} from "@senstate/client";
import {GroupedWatchers, HubService} from "../../../state/hub.service";
import {NgxMasonryOptions} from "ngx-masonry";
import {SettingsService} from "../../../services/settings.service";

const SETTING_MAX_WIDTH = 'masonry_disable_max_width';

@Component({
  selector: 'senstate-watchers-masonry',
  templateUrl: './watchers-masonry.component.html',
  styleUrls: ['./watchers-masonry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WatchersMasonryComponent implements OnInit {

  @Input()
  public appId: string;

  @Input()
  public autoSizeCards = false;

  public watchers$: Observable<GroupedWatchers[]>;

  public masonryConfig: NgxMasonryOptions = {
    horizontalOrder: true
  };

  public trackByWatcherFunc: TrackByFunction<WatcherMeta> = (index, item) => {
    return item.watchId;
  };

  public trackByGroupFunc: TrackByFunction<GroupedWatchers> = (index, item) => {
    return item.key;
  };

  constructor(private hub: HubService,
              private cd: ChangeDetectorRef,
              private settings: SettingsService) {

    this.autoSizeCards = settings.loadSetting(SETTING_MAX_WIDTH, false);
  }

  ngOnInit() {
    this.watchers$ = this.hub.getGroupedWatchersByApp$(this.appId);
  }

  toggleAutoSize() {
    this.autoSizeCards = !this.autoSizeCards;

    this.settings.saveSetting(SETTING_MAX_WIDTH, this.autoSizeCards);
    // this.cd.markForCheck();
    this.cd.detectChanges();
  }

}
