import {
  AppMeta,
  CLIENT_CONSTS,
  CONNECTION,
  ErrorData,
  LogData,
  someGuid,
  WatchData,
  WatcherMeta
} from '@senstate/client';
import {Socket, SocketEvent} from "./socket";


export function setSenstateConnection (
  appMeta: Partial<AppMeta>,
  address = 'ws://localhost:3333'
) {
  if(!appMeta.appId) {
    appMeta.appId = someGuid();
  }

  const socket = new Socket(address);
  socket.socketEvents$.subscribe(
    value => {
      switch(value) {
        case SocketEvent.Connected: {
          socket.sendJson(CLIENT_CONSTS.ADD_APP, appMeta);
          break;
        }
        default: {

        }
      }
    }
  );

  CONNECTION.current = {
    setWatcher (meta: WatcherMeta) {
     socket.sendJson(CLIENT_CONSTS.ADD_WATCHER, meta);
    },
    sendData (data: WatchData) {
      socket.sendJson(CLIENT_CONSTS.INPUT_EVENT, data);
    },
    sendLog (data: LogData) {
      socket.sendJson(CLIENT_CONSTS.INPUT_LOG_EVENT, data);
    },
    sendError (data: ErrorData) {
      socket.sendJson(CLIENT_CONSTS.INPUT_ERROR_EVENT, data);
    }
  };
}
