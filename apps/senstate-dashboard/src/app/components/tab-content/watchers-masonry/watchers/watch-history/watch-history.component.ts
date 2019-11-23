import {Component, OnInit, ChangeDetectionStrategy, Input, TemplateRef} from '@angular/core';
import {Observable} from "rxjs";
import {HubService} from "../../../../../state/hub.service";
import {map, scan} from "rxjs/operators";

export function lastValues<T> (lastX: number) {
  return scan<T>((acc, val) => {
    acc.push(val);
    return [...acc.slice(-lastX)];
  }, []);
}

@Component({
  selector: 'senstate-watch-history',
  templateUrl: './watch-history.component.html',
  styleUrls: ['./watch-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WatchHistoryComponent implements OnInit {
  @Input()
  public watchId: string;

  public data$ : Observable<string[]>;

  @Input()
  public template: TemplateRef<any>;

  constructor (private hubService: HubService) { }

  ngOnInit() {
    this.data$ = this.hubService.getWatcherData$(this.watchId).pipe(
      lastValues(5),
      map(ar => [...ar].reverse())
    );
  }

}
