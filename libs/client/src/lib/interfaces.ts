export interface AppMeta {
  appId: string;
  name: string;
}

export const enum WatchType {
  String,
  Number,
  Json,
  Performance
}

export interface WatcherMeta {
  watchId: string;
  tag: string;
  type: WatchType;
}

export interface WatchData {
  watchId: string;
  data: any;
}

export interface LogData {
  log: any;
}

export interface Connection {
  setWatcher(meta: WatcherMeta);
  sendData(data: WatchData);
  sendLog(data: LogData);
}
