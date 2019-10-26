import {map, tap} from 'rxjs/operators';
import {LogLevel, WatchType} from './interfaces';
import {TimeMeasurer} from "./utils/measure";
import {createWatchSender} from "./sender/watch-sender";
import { createLogSender } from './sender/log-sender';

export const SenstateOperators = {
  watch: <T> (tag: string, type?: WatchType) => {
    const sender = createWatchSender(tag, type);

    return tap<T>(sender);
  },
  measureStart: <T> (measurer: TimeMeasurer) => {
    return tap<T>(() => measurer.start())
  },
  measureStep: <T> (measurer: TimeMeasurer) => {
    return tap<T>(() => measurer.step())
  },
  log: <T> (name: string, level?: LogLevel) => {
    const sender = createLogSender(level, name);

    return tap<T>((data) => sender('', data));
  }
};

// TODO to scan pipe ?

export const UtilOperators = {
  min: () => {
    // any better rxjs way?
    let minVal:number = null;

    return map<any, number>(
      (x) => {
        if(minVal == null){
          return minVal = x;
        }
        return minVal = Math.min(minVal, x);
      }
    );
  },
  max: () => {
    // any better rxjs way?
    let maxVal:number = null;

    return map<any, number>(
      (x) => {
        if(maxVal == null){
          return maxVal = x;
        }

        return maxVal = Math.max(maxVal, x);
      }
    );
  },
};

