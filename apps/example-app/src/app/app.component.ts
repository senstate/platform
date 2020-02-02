import {Component} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {genericLogSender, LogLevel, PropertyWatcher, SenstateOperators, WatchType} from '@senstate/client';
import {map} from 'rxjs/operators';

const logger = genericLogSender();

interface IWatcherInfo {
  timer: number;
  type: string;
  obs$: Subscription;
}

function typeToLabel (watchType: WatchType) {
  switch (watchType) {
    case WatchType.Json:
      return 'JSON';
    case WatchType.String:
      return 'String';
    case WatchType.Performance:
      return 'Performance';
    case WatchType.Number:
      return 'Number'
  }
}

@Component({
  selector: 'senstate-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'example-app';

  @PropertyWatcher()
  public watchProperty = 0;

  @PropertyWatcher({tag: 'otherKey'})
  public watchOtherProperty = 0;

  public runningWatchers: IWatcherInfo[] = [];

  watchTypes = [WatchType.Number, WatchType.String, WatchType.Json].map(t => ({
    name: typeToLabel(t),
    value: t
  }));

  startTimer (intervalPeriod, watchType: WatchType) {
    this.runningWatchers.push({
      timer: intervalPeriod,
      type: typeToLabel(watchType),
      obs$: interval(intervalPeriod).pipe(
        map(v => {
          if (watchType === WatchType.Json) {
            return {
              bigDataToSend: v,
              someOtherData: [
                {
                  obj: 'inArraay'
                }
              ]
            }
          }

          if (watchType === WatchType.String) {
            return `SOme string with\n${v}\nNewline!!!`;
          }

          return v;
        }),
        SenstateOperators.watch({tag: `${typeToLabel(watchType)} Pipe`, group: 'Example Data'})
      ).subscribe(value => {

      })
    });
  }

  addLog () {
    logger({
      log: 'New Info Log',
      data: {
        some: 'additional data',
        hm: 1
      }
    });
    logger({
      log: 'New Debug Log',
      data: {
        some: 'additional data',
        hm: 2
      },
      logLevel: LogLevel.Debug
    });
    logger({
      log: 'New Warn Log',
      data: {
        some: 'additional data',
        hm: 3
      },
      logLevel: LogLevel.Warn
    });
    logger({
      log: 'New Error Log',
      data: {
        some: 'additional data',
        hm: 4
      },
      logLevel: LogLevel.Error
    });
  }

  addWindowError () {
    let foo: any = null;

    // example error to be "uncaught"
    // noinspection JSObjectNullOrUndefined
    foo.baz(); // lgtm [js/property-access-on-non-object]
  }

  removeWatcher (index: number) {
    const watcher = this.runningWatchers[index];
    watcher.obs$.unsubscribe();

    this.runningWatchers.splice(index, 1);
  }

  addEvents () {
    this.startTimer(50, WatchType.String);
    this.startTimer(50, WatchType.Number);
    this.startTimer(50, WatchType.Json);
  }

  updateProperty () {
    this.watchProperty++;
    this.watchOtherProperty += 2;
  }
}
