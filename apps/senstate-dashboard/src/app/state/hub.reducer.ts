import {HubActions} from '../state/actions';
import {Action} from "ts-action";
import {on} from 'ts-action-immer/reducer';
import {createReducer} from "@ngrx/store";
import {WatchData} from "@senstate/client";
import {ErrorEvent, LogEvent, MetaStore} from "@senstate/dashboard-connection";
import {SocketEvent} from "@senstate/client-connection";


interface EventsByApp {
  // watcherId
  [key: string]: any
}

interface WatcherToApp {
  [key: string]: string
}

interface AppState {
  [key: string]: Partial<EventsByApp>;
}

export interface HubState {
  socketStatus: SocketEvent;
  eventsByApp: AppState;
  watcherToApp: WatcherToApp;
  eventsCounter: { [key: string]: number };
  logsByApp: { [key: string]: LogEvent[] };
  errorsByApp: { [key: string]: ErrorEvent[] };

  meta: MetaStore;
}


export const HubReducerInitState: HubState = {
  socketStatus: SocketEvent.Connecting,
  eventsByApp: {},
  watcherToApp: {},
  eventsCounter: {},
  logsByApp: {},
  errorsByApp: {},

  // from cli
  meta: {
    apps: {}
  }
};

const topicReducer = createReducer(
  HubReducerInitState,

  on(HubActions.GOT_META, (state, action) => {

    // remove events of a removed app
    const currentAppIdList = Object.keys(state.meta.apps);
    const newAppIdList = Object.keys(action.payload.apps);

    currentAppIdList.map(app => {
      if (!newAppIdList.includes(app)) {
        delete state.eventsByApp[app];
      }
    });

    // set meta
    state.meta = action.payload;


    const watcherToApp: WatcherToApp = {};
    newAppIdList.map(app => {
      Object.keys(state.meta.apps[app].watchers)
        .map(watchId => {
          watcherToApp[watchId] = app;
        });
    });

    // update the watcher to app map
    state.watcherToApp = watcherToApp;
  }),

  on(HubActions.RECEIVED_DATA, (state, {payload}) => {
    const {watchId, data} = payload;
    if (!state.watcherToApp[watchId]) {
      return;
    }

    const appId = state.watcherToApp[watchId];

    const eventsByApp = state.eventsByApp[appId] = state.eventsByApp[appId] || {};
    eventsByApp[watchId] = data;

    const counterElement = state.eventsCounter[watchId] || 0;
    state.eventsCounter[watchId] = counterElement + 1;
  }),

  on(HubActions.LOG_DATA, (state, {payload}) => {
    const logsAr = state.logsByApp[payload.appId] = state.logsByApp[payload.appId] || [];
    logsAr.push(payload);
  }),

  on(HubActions.ERROR_DATA, (state, {payload}) => {
    const logsAr = state.errorsByApp[payload.appId] = state.errorsByApp[payload.appId] || [];
    logsAr.push(payload);
  }),

  on(HubActions.STATUS_CHANGED, (state, action) => {
    state.socketStatus = action.payload;
  })
);

export function hubReducer (state: HubState | undefined, action: Action) {
  return topicReducer(state, action);
}
