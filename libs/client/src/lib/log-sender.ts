import { CONNECTION } from './current-connection';


export type LogSender = (v: any) => void;

export function createLogSender(): LogSender {
  return (log) => {
    CONNECTION.current.sendLog({
      log
    });
  }
}
