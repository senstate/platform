import {LogData, LogLevel} from "../interfaces";
import {CONNECTION} from "../current-connection";
import {createLogSender, genericLogSender} from "./log-sender";

describe('log-sender', () => {
  let sendLogSpy: jest.SpyInstance<any, [LogData]>;


  describe('createLogSender', () => {
    beforeEach(() => {
      sendLogSpy = jest.spyOn(CONNECTION.current, 'sendLog');
    });

    afterEach(() => {
      sendLogSpy.mockRestore();
    });

    it ('create sender without parameters - sendLogCalled', () => {
      const sender = createLogSender();

      sender('some log');

      expect(sendLogSpy).toBeCalledTimes(1);
      expect(sendLogSpy).toBeCalledWith({log: 'some log', logLevel: LogLevel.Info})
    });

    it ('create sender with custom LogLevel', () => {
      const sender = createLogSender(LogLevel.Warn);

      sender('some warning');

      expect(sendLogSpy).toBeCalledTimes(1);
      expect(sendLogSpy).toBeCalledWith({log: 'some warning', logLevel: LogLevel.Warn})
    });
  });


  describe('genericLogSender', () => {
    beforeEach(() => {
      sendLogSpy = jest.spyOn(CONNECTION.current, 'sendLog');
    });

    afterEach(() => {
      sendLogSpy.mockRestore();
    });

    it ('create sender without parameters - sendLogCalled', () => {
      const genericSender = genericLogSender();

      genericSender({
        logLevel: LogLevel.Info,
        log: 'some log'
      });

      expect(sendLogSpy).toBeCalledTimes(1);
      expect(sendLogSpy).toBeCalledWith({log: 'some log', logLevel: LogLevel.Info})
    });

    it ('create sender with custom LogLevel', () => {
      const genericSender = genericLogSender();

      genericSender({
        logLevel: LogLevel.Warn,
        log: 'some warning'
      });

      expect(sendLogSpy).toBeCalledTimes(1);
      expect(sendLogSpy).toBeCalledWith({log: 'some warning', logLevel: LogLevel.Warn})
    });
  });
});
