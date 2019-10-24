import {createLogSender} from "../sender/log-sender";
import {createWatchSender} from "@senstate/client";

export interface SimpleChange<T> {
  previousValue: T;
  currentValue: T;
}

export type PropertyWatcherCallback<T> = (value: T, context, simpleChange?: SimpleChange<T>) => void

export function PropertyWatcher<T = any> (tag?: string, callback?: PropertyWatcherCallback<T>) {
  const cachedValueSymbol = Symbol('CachedValue');

  return (target: any, key: PropertyKey) => {
    const watchSender = createWatchSender(tag || key.toString());

    Object.defineProperty(target, key, {
      set: function (value) {
        // No operation if new value is same as old value
        if (this[cachedValueSymbol] === value) {
          return;
        }
        if (callback) {
          const oldValue = this[cachedValueSymbol];
          this[cachedValueSymbol] = value;
          const simpleChange: SimpleChange<T> = {
            previousValue: oldValue,
            currentValue: value,
          };
          callback.apply(this, [value, this, simpleChange]);
        } else {
          this[cachedValueSymbol] = value;
        }

        watchSender(value);
      },
      get: function () {
        return this[cachedValueSymbol];
      },
    });
  };
}
