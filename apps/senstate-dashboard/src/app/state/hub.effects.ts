import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {SocketService} from "../socket.service";
import {DASHBOARD_EVENT_NAMES, MetaStore} from "@senstate/dashboard-connection";
import {map, tap} from "rxjs/operators";
import {HubActions} from "./actions";
import {ErrorData, LogData, WatchData} from "@senstate/client";

@Injectable()
export class HubEffects {
  @Effect()
  private metaEvent$ = this.socketService.fromEvent<MetaStore>(DASHBOARD_EVENT_NAMES.META).pipe(
    map(v => HubActions.GOT_META(v))
  );

  @Effect()
  private dataEvents$ = this.socketService.fromEvent<WatchData>(DASHBOARD_EVENT_NAMES.WATCHER_EVENTS).pipe(
    map(d => HubActions.RECEIVED_DATA(d))
  );

  @Effect()
  private logEvents$ = this.socketService.fromEvent<LogData>(DASHBOARD_EVENT_NAMES.LOG).pipe(
    map(l => HubActions.LOG_DATA(l))
  );

  @Effect()
  private errorEvents$ = this.socketService.fromEvent<ErrorData>(DASHBOARD_EVENT_NAMES.ERROR).pipe(
    map(l => HubActions.ERROR_DATA(l))
  );

  constructor (private actions$: Actions,
               private socketService: SocketService) {

  }
}
