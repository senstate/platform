import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {Observable} from "rxjs";
import {WatcherMeta} from "@senstate/client";
import {HubService} from "../../../state/hub.service";

@Component({
  selector: 'senstate-watchers-list',
  templateUrl: './watchers-list.component.html',
  styleUrls: ['./watchers-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WatchersListComponent implements OnInit {

  @Input()
  public appId: string;

  public watchers$: Observable<WatcherMeta[]>;

  constructor(private hub: HubService) { }

  ngOnInit() {
    this.watchers$ = this.hub.getWatchersByApp$(this.appId)
  }


  public trackByWatcherFunc (tagObj: any) {
    return tagObj.watchId;
  }
}
