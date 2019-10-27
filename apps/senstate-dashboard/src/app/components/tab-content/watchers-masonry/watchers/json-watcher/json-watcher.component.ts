import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {WatchData} from "@senstate/client";
import {HubService} from "../../../../../state/hub.service";

@Component({
  selector: 'senstate-json-watcher',
  templateUrl: './json-watcher.component.html',
  styleUrls: ['./json-watcher.component.scss']
})
export class JsonWatcherComponent implements OnInit {
  @Input()
  public watchId: string;

  public data$ : Observable<WatchData>;

  constructor (private hubService: HubService) { }

  ngOnInit() {
    this.data$ = this.hubService.getWatcherData$(this.watchId);
  }

}
