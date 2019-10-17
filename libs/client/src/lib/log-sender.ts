import {CONNECTION} from './current-connection';
import {LogLevel} from "./interfaces";


export type LogSender = (v: any) => void;

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

