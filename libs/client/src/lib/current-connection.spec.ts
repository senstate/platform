import {CONNECTION} from "./current-connection";
import {LogLevel, WatchData, WatcherMeta, WatchType} from "@senstate/client";

describe('CONNECTION', () => {
  describe('.current.sendLog', () => {

    it ('console.debug gets called', () => {
      const consoleDebugSpy = jest.spyOn(console, 'debug');

      CONNECTION.current.sendLog({
        logLevel: LogLevel.Debug,
        log: 'My test message'
      });

      expect(consoleDebugSpy).toBeCalledWith("[Debug]: My test message", undefined)

      consoleDebugSpy.mockRestore();

    });

    it ('console.debug gets called', () => {
      const consoleDebugSpy = jest.spyOn(console, 'debug');

      CONNECTION.current.sendLog({
        logLevel: LogLevel.Debug,
        log: 'My test message',
        data: {
          my: {
            additionalData: true
          }
        }
      });

      expect(consoleDebugSpy).toBeCalledWith("[Debug]: My test message", {
        my: {
          additionalData: true
        }
      });

      consoleDebugSpy.mockRestore();
    });

    it ('console.info gets called', () => {
      const consoleDebugSpy = jest.spyOn(console, 'info');

      CONNECTION.current.sendLog({
        logLevel: LogLevel.Info,
        log: 'My test message'
      });

      expect(consoleDebugSpy).toBeCalledWith("[Info]: My test message", undefined)

      consoleDebugSpy.mockRestore();

    });

    it ('console.warn gets called', () => {
      const consoleDebugSpy = jest.spyOn(console, 'warn');

      CONNECTION.current.sendLog({
        logLevel: LogLevel.Warn,
        log: 'My test message'
      });

      expect(consoleDebugSpy).toBeCalledWith("[Warn]: My test message", undefined)

      consoleDebugSpy.mockRestore();

    });

    it ('console.error gets called', () => {
      const consoleDebugSpy = jest.spyOn(console, 'error');

      CONNECTION.current.sendLog({
        logLevel: LogLevel.Error,
        log: 'My test message'
      });

      expect(consoleDebugSpy).toBeCalledWith("[Error]: My test message", undefined)

      consoleDebugSpy.mockRestore();

    });

    it ('unknown logLevel throws an error', () => {
      expect(() => {
        CONNECTION.current.sendLog({
          logLevel: 7,
          log: 'My test message'
        });
      }).toThrow('Not possible LogLevel: 7');
    });
  });

  describe('.current.sendError', () => {

    it ('console.error gets called', () => {
      const consoleDebugSpy = jest.spyOn(console, 'error');

      const error = {
        errorName: 'error',
        message: 'Something is broken'
      };

      CONNECTION.current.sendError(error);

      expect(consoleDebugSpy).toBeCalledWith("error - Something is broken", error);

      consoleDebugSpy.mockRestore();

    });
  });

  describe('.current.sendData', () => {

    it ('console.info gets called', () => {
      const consoleDebugSpy = jest.spyOn(console, 'info');

      const watchMeta: WatcherMeta = {
        watchId: 'just-watch-id',
        tag: 'My Label',
        group: 'Watch-Group',
        type: WatchType.String
      };

      CONNECTION.current.setWatcher(watchMeta);

      const watchData: WatchData = {
        watchId: 'just-watch-id',
        data: "My Watch Value"
      };

      CONNECTION.current.sendData(watchData);

      expect(consoleDebugSpy).toBeCalledWith("[Watch-Group/My Label]:", "My Watch Value");

      consoleDebugSpy.mockRestore();

    });
  });
});
