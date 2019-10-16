import {AppMeta, WatcherMeta} from '@senstate/client';

export interface WatcherStore {
  [key: string]: WatcherMeta
}

export interface App extends AppMeta {
  client: string;
  watchers: WatcherStore;
}

export interface AppStore {
  [key: string]: App;
}


export interface MetaStore {
  apps: AppStore;
}


// TODO AS ACTIONS
export const DASHBOARD_EVENT_NAMES = {
  META: 'meta',
  WATCHER_EVENTS: 'events',
  NEED_META: 'needMeta',
  LOG: 'log',
  CHANGE_DEBOUNCE_TIME: 'changeDebounce'
};

export interface NetworkInfo {
  ifname: string;
  address: string;
}

export interface LogEvent {
  log: string;
  appId: string;
}
