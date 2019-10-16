import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {WatchData} from "@senstate/client";
import {HubService} from "../../state/hub.service";

@Component({
  selector: 'senstate-string-watcher',
  templateUrl: './string-watcher.component.html',
  styleUrls: ['./string-watcher.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StringWatcherComponent implements OnInit {

  @Input()
  public watchId: string;

  public data$ : Observable<WatchData>;

  constructor (private hubService: HubService) { }

  ngOnInit() {
    this.data$ = this.hubService.getWatcherData$(this.watchId);
  }

}
