import {ChangeDetectionStrategy, Component, Input, OnInit, TrackByFunction} from '@angular/core';
import {Observable} from "rxjs";
import {WatcherMeta} from "@senstate/client";
import {GroupedWatchers, HubService} from "../../../state/hub.service";
import {DebugToggleService} from "../../../services/debug-toggle.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'senstate-watchers-list',
  templateUrl: './watchers-list.component.html',
  styleUrls: ['./watchers-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WatchersListComponent implements OnInit {

  @Input()
  public groupedColumnWidth: number = 50;

  @Input()
  public watcherColumnWidth: number = 50;

  @Input()
  public appId: string;

  public groupedWatchers$: Observable<GroupedWatchers[]>;

  public trackByWatcherFunc: TrackByFunction<WatcherMeta> = (index, item) => {
    return item.watchId;
  };

  public trackByGroupFunc: TrackByFunction<GroupedWatchers> = (index, item) => {
    return item.key;
  };

  constructor(private hub: HubService,
              public debugToggle: DebugToggleService) { }

  ngOnInit() {
    this.groupedWatchers$ = this.hub.getGroupedWatchersByApp$(this.appId).pipe(
      map(groupedWatchers => {
        const hasGroupName = groupedWatchers.some(group => this.hasName(group));

        groupedWatchers.forEach(group => {
          group.haveGroups = hasGroupName;
          group.hasName = this.hasName(group);
        });

        return groupedWatchers;
      })
    );
  }

  private hasName(group: GroupedWatchers) {
    return group.key && group.key !== 'undefined';
  }
}
