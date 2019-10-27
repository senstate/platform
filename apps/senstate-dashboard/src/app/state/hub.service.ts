import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from './index'
import {SocketEvent} from "@senstate/client-connection";
import {DashboardActions, HubActions} from "./actions";
import {map, tap} from "rxjs/operators";

@Injectable()
export class HubService {

  // todo selectors/refactor :)
  app$ = this.state.select(s => Object.values(s.data.meta.apps));
  socketStatus$ = this.state.select(s => {
    switch (s.data.socketStatus) {
      case SocketEvent.Connecting:
        return 'Connecting';
      case SocketEvent.Connected:
        return 'Connected';
      case SocketEvent.Closed:
        return 'Closed';
      case SocketEvent.Error:
        return 'Error';
    }
  });

  watcherCount$ = this.state.select(s => {
    return Object.keys(s.data.watcherToApp).length;
  });

  constructor (private state: Store<State>) {

  }

  getWatchersByApp$ (appId: string) {
    return this.state.select(state => {
      const watchers = state.data.meta.apps[appId].watchers;
      return Object.keys(watchers).map(w => watchers[w]);
    })
  }

  getWatcherData$ (watchId: string) {
    return this.state.select(state => {
      const appId = state.data.watcherToApp[watchId];

      if (!appId) {
        return null;
      }

      const eventsByApp = state.data.eventsByApp[appId];

      if (eventsByApp) {
        return eventsByApp[watchId];
      }

      return null;
    })
  }

  getLogs$ (appId: string) {
    return this.state.select(state => {
      return state.data.logsByApp[appId];
    })
  }

  getErrors$ (appId: string) {
    return this.state.select(state => {
      return state.data.errorsByApp[appId];
    })
  }

  isWatcherPaused$(appId: string, watchId: string) {
    return this.state.select(s => s.data.watchersPaused[`${appId}_${watchId}`]).pipe(
      map(v => v || false)
    );
  }

  statusChanged (value: SocketEvent) {
    this.state.dispatch(HubActions.STATUS_CHANGED(value));
  }

  togglePaused (appId: string, watchId: string) {
    this.state.dispatch(DashboardActions.TOGGLE_PAUSE(`${appId}_${watchId}`));
  }
}
