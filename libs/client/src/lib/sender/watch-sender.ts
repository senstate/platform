import { WatchType} from '../interfaces';
import { CONNECTION } from '../current-connection';
import {someGuid} from "../utils/utils";


export type WatchSender = (v: any) => void;

export function createWatchSender(tag: string, type?: WatchType): WatchSender {
  const watchId = someGuid();

  let metaRegistered = false;

  return (v) => {
    if (!metaRegistered) {
      CONNECTION.current.setWatcher({
        watchId,
        tag,
        type: typeof type !== 'undefined' ? type : getTypeOfValue(v)
      });
      metaRegistered = true;
    }

    CONNECTION.current.sendData({
      watchId,
      data: v
    });
  }
}

function getTypeOfValue (v: any): WatchType {
  if (typeof v === 'string') {
    return WatchType.String;
  } else if (typeof v === 'number') {
    return WatchType.Number;
  } else {
    return WatchType.Json;
  }
}
