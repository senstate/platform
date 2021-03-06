import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from './index'
import {SocketEvent} from "@senstate/client-connection";
import {DashboardActions, HubActions} from "./actions";
import {map, startWith} from "rxjs/operators";
import {someGuid, WatcherMeta, WatchType} from "@senstate/client";
import {BehaviorSubject, combineLatest, interval, of} from "rxjs";
import {App} from "@senstate/dashboard-connection";
import groupBy from 'lodash/groupBy';

const hubAppId = 'hub';
const hubWatchId = 'hub#1';
const hubWatchMeta =  {
  watchId: hubWatchId,
  tag: 'State',
  type: WatchType.Json
} as WatcherMeta;

export interface GroupedWatchers {
  key: string;
  watchers: WatcherMeta[];
  haveGroups?: boolean;
  hasName?: boolean;
}

@Injectable()
export class HubService {
  private hubApp$ = new BehaviorSubject<App[]>([]);

  // todo selectors/refactor :)
  app$ = combineLatest([
    this.hubApp$,
    this.state.select(s => Object.values(s.data.meta.apps))
  ]).pipe(
    map(([hubApp, allOther]) => {
      const combined = [...allOther, ...hubApp];

      const sorted = [
        ...combined.filter(c => !c.disconnected),
        ...combined.filter(c => c.disconnected === true)
      ]

      return sorted;
    })
  );

  socketStatus$ = this.state.select(s => {
    switch (s.data.socketStatus) {
      case SocketEvent.Connecting:
        return 'Connecting';
      case SocketEvent.Connected:
        return 'Connected';
      case SocketEvent.Closed:
        return 'Closed';
      case SocketEvent.Error:
        return 'Error';
    }
  });

  watcherCount$ = this.state.select(s => {
    return Object.keys(s.data.watcherToApp).length;
  });

  constructor (private state: Store<State>) {
    // this.addHubAsApp();
  }

  getWatchersByApp$ (appId: string) {
    console.info('appId', appId);
    return appId === hubAppId ? of([
      hubWatchMeta
    ]) : this.state.select(state => {
      const watchers = state.data.meta.apps[appId].watchers;
      return Object.keys(watchers).map(w => watchers[w]);
    })
  }

  getGroupedWatchersByApp$ (appId: string) {
    return this.getWatchersByApp$(appId).pipe(
      map(watchers => {
        const grouped = groupBy(watchers, 'group');
        return Object.keys(grouped).map(key => ({
          key,
          watchers: grouped[key]
        }) as GroupedWatchers);
      })
    );
  }

  getWatcherData$ (watchId: string) {
    return this.state.select(state => {
      if (watchId === hubWatchId) {

        return {
          apps: Object.keys(state.data.eventsByApp)
        };
      }

      const appId = state.data.watcherToApp[watchId];

      if (!appId) {
        return null;
      }

      const eventsByApp = state.data.eventsByApp[appId];

      if (eventsByApp) {
        return eventsByApp[watchId];
      }

      return null;
    })
  }

  getLogs$ (appId: string) {
    return this.state.select(state => {
      return state.data.logsByApp[appId];
    })
  }

  getErrors$ (appId: string) {
    return this.state.select(state => {
      return state.data.errorsByApp[appId];
    })
  }

  isWatcherPaused$(appId: string, watchId: string) {
    return this.state.select(s => s.data.watchersPaused[`${appId}_${watchId}`]).pipe(
      map(v => v || false)
    );
  }

  statusChanged (value: SocketEvent) {
    this.state.dispatch(HubActions.STATUS_CHANGED(value));
  }

  togglePaused (appId: string, watchId: string) {
    this.state.dispatch(DashboardActions.TOGGLE_PAUSE(`${appId}_${watchId}`));
  }

  startExampleData () {
    const stringWatcherKey = someGuid();
    const numWatcherKey = someGuid();
    const jsonWatcherKey = someGuid();
    const appId = 'sampleApp';

    // add logs
    this.state.dispatch(HubActions.GOT_META({
      apps: {
        [appId]: {
          appId,
          name: 'Sample App Data',
          client: '',
          watchers: {
            [stringWatcherKey]: {
              group: 'Group 1',
              type: WatchType.String,
              tag: 'string value',
              watchId: stringWatcherKey
            },
            [numWatcherKey]: {
              group: 'Group 1',
              type: WatchType.Number,
              tag: 'number value',
              watchId: numWatcherKey
            },
            [jsonWatcherKey]: {
              type: WatchType.Json,
              tag: 'json values',
              group: 'Group 2',
              watchId: jsonWatcherKey
            }
          }
        }
      }
    }));

    // add errors
    this.state.dispatch(HubActions.ERROR_DATA({
      appId,
      data: {
        message: 'just an error',
        methodName: 'methodWhereTheErrorHappend',
        line: 1337,
        errorName: 'ExampleDataError'
      }
    }));

    this.state.dispatch(HubActions.ERROR_DATA({
      appId,
      data: {
        message: 'just an another error',
        methodName: 'methodWhereTheErrorHappendTwice',
        line: 1338,
        errorName: 'ExampleOtherError',
        stack: ['error at file:13', 'caller at file2:54'].join('\n')
      }
    }));

    // add logs
    this.state.dispatch(HubActions.LOG_DATA({
      appId,
      data: {
        line: 1337,
        log: 'Example Log Entry',
        logName: 'Custom Log Name',
        data: {
          extra: {
            log: {
              data: 1
            }
          }
        }
      }
    }));

    // add watchers
    return interval(650).pipe(
      startWith(0)
    ).subscribe(value => {
      this.state.dispatch(HubActions.RECEIVED_DATA({
        watchId: stringWatcherKey,
        data: `${value} some example string`
      }));

      this.state.dispatch(HubActions.RECEIVED_DATA({
        watchId: numWatcherKey,
        data: value
      }));

      this.state.dispatch(HubActions.RECEIVED_DATA({
        watchId: jsonWatcherKey,
        data: {
          someObject: {
            numProp: value,
            strProp: 'str',
          }
        }
      }));
    });
  }

  addHubAsApp () {
    this.hubApp$.next([
      {
        appId: hubAppId,
        name: 'Dashboard',
        client: 'this',
        watchers: {
         // [hubWatchId]: hubWatchMeta
        }
      }
    ])
  }

  getWatcherUpdateCount$(watchId: string) {
    return this.state.select(s => s.data.eventsCounter[watchId]).pipe(

      );

  }
}
