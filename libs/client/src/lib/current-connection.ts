import {Connection, ErrorData, LogData, WatchData, WatcherMeta} from './interfaces';

/**
 * To be used with @senstate/client-connection
 */
export const CONNECTION: {
  current: Connection
} = {
  current: {
    sendData (data: WatchData) {},
    setWatcher (meta: WatcherMeta) {},
    sendLog (data: LogData) {},
    sendError (data: ErrorData) {}
  }
};
