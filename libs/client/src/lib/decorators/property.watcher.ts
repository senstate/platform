import {CreateWatchPayload, createWatchSender} from "../sender/watch-sender";

export interface SimpleChange<T> {
  previousValue: T;
  currentValue: T;
}

export type PropertyWatcherCallback<T> = (value: T, context, simpleChange?: SimpleChange<T>) => void

export function PropertyWatcher<T = any> (opt?: Partial<CreateWatchPayload>, callback?: PropertyWatcherCallback<T>) {
  const cachedValueSymbol = Symbol('CachedValue');

  if (!opt) {
    opt = {};
  }

  return (target: any, key: PropertyKey) => {
    if (!opt.tag) {
      opt.tag = key.toString();
    }

    const watchSender = createWatchSender(opt as CreateWatchPayload);

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
