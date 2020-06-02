import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input, TrackByFunction
} from '@angular/core';
import {Observable} from "rxjs";
import {WatcherMeta} from "@senstate/client";
import {GroupedWatchers, HubService} from "../../../state/hub.service";
import {NgxMasonryOptions} from "ngx-masonry";


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

  constructor(private hub: HubService) { }

  ngOnInit() {
    this.watchers$ = this.hub.getGroupedWatchersByApp$(this.appId);
  }

}
