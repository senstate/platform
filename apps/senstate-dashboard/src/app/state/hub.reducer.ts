import {DashboardActions, HubActions} from '../state/actions';
import {Action, reducer} from "ts-action";
import {on} from 'ts-action-immer/reducer';
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

interface WatchersPaused {
  [key: string]: boolean; // key => APPID_WATCHID
}

export interface HubState {
  watchersPaused: WatchersPaused;

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

  // settings
  watchersPaused: {},

  // data
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

const topicReducer = reducer(
  HubReducerInitState,
  on(HubActions.GOT_META, (state, action) => {

    // remove events of a removed app
    const currentAppIdList = Object.keys(state.meta.apps);
    const newAppIdList = Object.keys(action.payload.apps);

    // current apps in the dashboard
    currentAppIdList.map(app => {
      // new app list from hub
      if (!newAppIdList.includes(app)) {
        // not exists anymore
        state.meta.apps[app].disconnected = true;
      }
    });


    const watcherToApp: WatcherToApp = {};

    for(const app of newAppIdList) {
      const newAppMeta = action.payload.apps[app];


      // new app list from hub
      if (!currentAppIdList.includes(app)) {
        state.meta.apps[app] = {...newAppMeta};
      }

      const appInState = state.meta.apps[app];
      if (appInState) {
        const watcherMetas = {
          ...state.meta.apps[app].watchers
        };

        const watchers = Object.keys(newAppMeta.watchers);

        for (const watchId of watchers) {
          watcherToApp[watchId] = app;

          watcherMetas[watchId] = newAppMeta.watchers[watchId];
        }

        state.meta.apps[app].watchers = watcherMetas;
      }
    }

    // update the watcher to app map
    state.watcherToApp = watcherToApp;
  }),

  on(HubActions.RECEIVED_DATA, (state, {payload}) => {
    const {watchId, data} = payload;
    if (!state.watcherToApp[watchId]) {
      return;
    }

    const appId = state.watcherToApp[watchId];

    if (state.watchersPaused[`${appId}_${watchId}`]) {
      return;
    }

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
    const errorAr = state.errorsByApp[payload.appId] = state.errorsByApp[payload.appId] || [];
    errorAr.push(payload);
  }),

  on(HubActions.STATUS_CHANGED, (state, action) => {
    state.socketStatus = action.payload;
  }),

  on(DashboardActions.TOGGLE_PAUSE, (state, action) => {
    const paused = state.watchersPaused[action.payload] || false;
    state.watchersPaused[action.payload] = !paused;
    console.info(state.watchersPaused, paused);
  })
);

export function hubReducer (state: HubState | undefined, action: Action) {
  return topicReducer(state, action);
}
