import {Component} from '@angular/core';
import {interval, Subject, Subscription} from 'rxjs';
import {createLogSender, SenstateOperators, WatchType} from '@senstate/client';
import {map} from 'rxjs/operators';
import {setSenstateConnection} from '@senstate/client-connection';

setSenstateConnection({
  name: 'My Example App'
});

const logger = createLogSender();

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

  public runningWatchers: IWatcherInfo[] = [];

  public timer$ = new Subject();
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
        SenstateOperators.watch(`${typeToLabel(watchType)} Pipe`)
      ).subscribe(value => {

      })
    });
  }

  addLog () {
    logger('New Log, hi :)');
  }

  removeWatcher (index: number) {
    const watcher = this.runningWatchers[index];
    watcher.obs$.unsubscribe();

    this.runningWatchers.splice(index, 1);
  }
}
