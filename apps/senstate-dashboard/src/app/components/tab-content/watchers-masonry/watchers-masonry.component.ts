import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {Observable} from "rxjs";
import {WatcherMeta} from "@senstate/client";
import {HubService} from "../../../state/hub.service";
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

  public watchers$: Observable<WatcherMeta[]>;

  public masonryConfig: NgxMasonryOptions = {
    horizontalOrder: true
  };

  constructor(private hub: HubService) { }

  ngOnInit() {
    this.watchers$ = this.hub.getWatchersByApp$(this.appId)
  }


  public trackByWatcherFunc (tagObj: any) {
    return tagObj.watchId;
  }

}
