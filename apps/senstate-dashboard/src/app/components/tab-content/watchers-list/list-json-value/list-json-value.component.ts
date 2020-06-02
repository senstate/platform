import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {Observable} from "rxjs";
import {WatchData} from "@senstate/client";
import {HubService} from "../../../../state/hub.service";

@Component({
  selector: 'senstate-list-json-value',
  templateUrl: './list-json-value.component.html',
  styleUrls: ['./list-json-value.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListJsonValueComponent implements OnInit {
  @Input()
  public watchId: string;

  public data$ : Observable<WatchData>;

  constructor (private hubService: HubService) { }

  ngOnInit() {
    this.data$ = this.hubService.getWatcherData$(this.watchId);
  }


}
