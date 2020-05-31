import {Connection, ErrorData, LogData, LogLevel, WatchData, WatcherMeta} from './interfaces';

const META_DICTIONARY: {[key: string]: WatcherMeta} = {};

function logLevelToString(level: LogLevel) {
  switch (level) {
    case LogLevel.Debug:
      return 'Debug';
    case LogLevel.Info:
      return 'Info';
    case LogLevel.Warn:
      return 'Warn';
    case LogLevel.Error:
      return 'Error';
    default:
      return `Unknown: ${level}`;
  }
}

type consoleMethod = {
  (message?: any, ...optionalParams: any[]): void;
}

function consoleCallByLogLevel(level: LogLevel): consoleMethod  {
  switch (level) {
    case LogLevel.Debug:
      return console.debug;
    case LogLevel.Info:
      return console.info;
    case LogLevel.Warn:
      return console.warn;
    case LogLevel.Error:
      return console.error;
    default:
      throw new Error(`Not possible: ${level}`)
  }
}

let logWritten = false;
function writeSenstateNotification () {
  if (!logWritten) {
    logWritten = true;

    console.warn('[Senstate]: You are using the "log-only"-mode, in order to send' +
      ' the data to the dashboard, you need to install: [@senstate/client-connection] and call: [setSenstateConnection] before: `bootstrapModule`' +
      ' - See for more information: https://github.com/senstate/platform/blob/master/libs/client/README.md')
  }
}

/**
 * To be used with @senstate/client-connection
 * or without, and just log all off
 */
export const CONNECTION: {
  current: Connection
} = {
  current: {
    sendData (data: WatchData) {
      const meta = META_DICTIONARY[data.watchId];

      console.info(`[${meta.group}/${meta.tag}]:`, data.data);
    },
    setWatcher (meta: WatcherMeta) {
      writeSenstateNotification();
      META_DICTIONARY[meta.watchId] = meta;
    },
    sendLog (data: LogData) {
      writeSenstateNotification();
      const consoleMethodOfType = consoleCallByLogLevel(data.logLevel);

      consoleMethodOfType(`[${logLevelToString(data.logLevel)}]: ${data.log}`, data.data);
    },
    sendError (data: ErrorData) {
      writeSenstateNotification();
      console.error(`${data.errorName} - ${data.message}`, data);
    }
  }
};
