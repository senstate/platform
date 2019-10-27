import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {UtilOperators} from "@senstate/client";
import {filter, shareReplay, tap} from "rxjs/operators";
import {HubService} from "../../../../../state/hub.service";

@Component({
  selector: 'senstate-number-watcher',
  templateUrl: './number-watcher.component.html',
  styleUrls: ['./number-watcher.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberWatcherComponent implements OnInit {

  @Input()
  public watchId: string;

  @Input()
  public showMinMax : boolean;

  public data$ : Observable<any>;

  public min$ : Observable<number>;
  public max$ : Observable<number>;

  constructor (private hubService: HubService,
               private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.data$ = this.hubService.getWatcherData$(this.watchId).pipe(
      filter(w => w !== null),
      shareReplay(0),
      tap( () => this.cd.detectChanges())
    );
    this.min$ = this.data$.pipe(
      UtilOperators.min()
    );

    this.max$ = this.data$.pipe(
      UtilOperators.max()
    );
  }


}
