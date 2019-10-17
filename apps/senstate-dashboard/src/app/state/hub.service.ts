import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from './index'
import {SocketEvent} from "@senstate/client-connection";
import {HubActions} from "./actions";

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

  getLogs (appId: string) {
    return this.state.select(state => {
      return state.data.logsByApp[appId];
    })
  }

  getErrors (appId: string) {
    return this.state.select(state => {
      return state.data.errorsByApp[appId];
    })
  }

  statusChanged (value: SocketEvent) {
    this.state.dispatch(HubActions.STATUS_CHANGED(value));
  }
}
