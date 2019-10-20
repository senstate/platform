import {CONNECTION} from './current-connection';
import {LogLevel} from "./interfaces";


export type LogSender = (log: string, data?: any, line?: any) => void;
export interface GenericLogSenderArgs {
  logLevel?: LogLevel;
  logName?: string;
  log: string;
  data?: any;
  line?: any
}
export type GenericLogSender = (log: GenericLogSenderArgs) => void;

// refactor / different way for js apps

export function createLogSender(logLevel: LogLevel = LogLevel.Info, logName?: string): LogSender {
  return (log, data?, line?) => {
    CONNECTION.current.sendLog({
      log,
      logLevel,
      logName,
      data,
      line
    });
  }
}

export function genericLogSender(): GenericLogSender {
  return (log: GenericLogSenderArgs) => {
    const logLevel = typeof log.logLevel === 'undefined' ? LogLevel.Info : log.logLevel;

    CONNECTION.current.sendLog({
      log: log.log,
      logLevel,
      logName: log.logName,
      data: log.data,
      line: log.line
    });
  }
}

