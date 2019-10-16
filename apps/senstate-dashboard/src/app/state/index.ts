import {
  ActionReducer,
  MetaReducer
} from '@ngrx/store';
import {hubReducer, HubState} from './hub.reducer';
import {storeLogger} from 'ngrx-store-logger';
import { environment } from '../../environments/environment';

export interface State {
  data: HubState;
}

export const stateReducer = {
  data: hubReducer,
};

export function logger (reducer: ActionReducer<any>): any {
  // default, no options
  return storeLogger({
    collapsed: true
  })(reducer);
}

export const metaReducers: MetaReducer<State>[] = environment.production
  ? []
  : [
     // logger
  ];
