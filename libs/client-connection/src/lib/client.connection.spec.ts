import {setSenstateConnection} from "./client.connection";
import {CLIENT_CONSTS, CONNECTION, ErrorData, LogLevel, WatchData, WatcherMeta, WatchType} from "@senstate/client";
import {Socket, SocketEvent} from "./socket";

const appMeta = {
  name: 'My Testing App'
};

describe('setSenstateConnection', () => {
  let socketSpy:  jest.SpyInstance<any>;

  beforeEach(() => {
    socketSpy = jest.spyOn(Socket.prototype, 'sendJson');

    setSenstateConnection(appMeta);
  });

  afterEach(() => {
    socketSpy.mockRestore();
  });

  it('sendLog is pushed to the socket ', () => {
    const logData = {
      data: true,
      log: 'This is a log',
      logLevel: LogLevel.Warn
    };

    CONNECTION.current.sendLog(logData);

    expect(socketSpy).toBeCalledWith(CLIENT_CONSTS.INPUT_LOG_EVENT, logData);
  });


  it('setWatcher is pushed to the socket ', () => {
    const setWatcherData: WatcherMeta = {
      group: 'My Group',
      tag: 'My Watcher Label',
      watchId: 'someId',
      type: WatchType.Json
    };

    CONNECTION.current.setWatcher(setWatcherData);

    expect(socketSpy).toBeCalledWith(CLIENT_CONSTS.ADD_WATCHER, setWatcherData);
  });

  it('sendError is pushed to the socket ', () => {
    const errorData: ErrorData = {
     message: 'Yeah broken again',
      errorName: 'BigOof',
      methodName: 'brokeAgain',
      line: 1337
    };

    CONNECTION.current.sendError(errorData);

    expect(socketSpy).toBeCalledWith(CLIENT_CONSTS.INPUT_ERROR_EVENT, errorData);
  });



  it('sendData is pushed to the socket ', () => {
    const watchData: WatchData = {
      watchId: 'someId',
      data: {
        senstate_works: true,
        someOtherStuff: {
          message: "Yep"
        }
      }
    };

    CONNECTION.current.sendData(watchData);

    expect(socketSpy).toBeCalledWith(CLIENT_CONSTS.INPUT_EVENT, watchData);
  });
});


// TODO Mock Socket to send socketEvents$ => Connected
xdescribe('setSenstateConnection', () => {
  let sendLogSpy:  jest.SpyInstance<any>;

  beforeEach(() => {
    sendLogSpy = jest.spyOn(Socket.prototype, 'sendJson');
    Socket.prototype.socketEvents$.next(SocketEvent.Connected);

    setSenstateConnection(appMeta);
  });

  afterEach(() => {
    sendLogSpy.mockRestore();
  });

  it('app-meta is pushed to the socket ', () => {
    expect(sendLogSpy).toBeCalledWith(CLIENT_CONSTS.ADD_APP, appMeta);
  });
});
