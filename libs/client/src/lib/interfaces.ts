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

export const enum LogLevel {
  Debug = 0,
  Info,
  Warn,
  Error
}

export interface LogData {
  log: any;
  logName?: string;
  logLevel?: LogLevel; // Info if not set
  line?: number; // if existing
  data?: any;
  timestamp?: number; // added by hub to dashboard
}

export interface ErrorData {
  errorName: string;
  message: string;
  line?: number;
  methodName?: string;
  stack: string;
}

export interface Connection {
  setWatcher(meta: WatcherMeta);
  sendData(data: WatchData);
  sendLog(data: LogData);
  sendError(data: ErrorData);
}
