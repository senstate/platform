import {Component, OnInit, ChangeDetectionStrategy, Input, TrackByFunction} from '@angular/core';
import {Observable} from "rxjs";
import {WatcherMeta} from "@senstate/client";
import {GroupedWatchers, HubService} from "../../../state/hub.service";

@Component({
  selector: 'senstate-watchers-list',
  templateUrl: './watchers-list.component.html',
  styleUrls: ['./watchers-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WatchersListComponent implements OnInit {

  @Input()
  public appId: string;

  public watchers$: Observable<GroupedWatchers[]>;

  public trackByWatcherFunc: TrackByFunction<WatcherMeta> = (index, item) => {
    return item.watchId;
  };

  public trackByGroupFunc: TrackByFunction<GroupedWatchers> = (index, item) => {
    return item.key;
  };

  constructor(private hub: HubService) { }

  ngOnInit() {
    this.watchers$ = this.hub.getGroupedWatchersByApp$(this.appId);
  }
}
