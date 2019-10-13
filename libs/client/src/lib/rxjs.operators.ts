import {tap} from 'rxjs/operators';
import {WatchType} from './interfaces';
import {TimeMeasurer} from './measure';
import {createWatchSender} from "./watch-sender";
import {createLogSender} from "./log-sender";

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
  log: <T> () => {
    const sender = createLogSender();

    return tap<T>(sender);
  }
};


