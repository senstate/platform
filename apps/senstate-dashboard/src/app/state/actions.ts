import {action, ActionCreator, ActionType, Creator, payload, Typed} from 'ts-action';
import {WatchData} from "@senstate/client";
import {ErrorEvent, LogEvent, MetaStore} from "@senstate/dashboard-connection";
import {SocketEvent} from "@senstate/client-connection";


export declare type ActionCreator<T extends string = string, C extends Creator = Creator> = Typed<C, T>;

export declare interface ActionCreatorMap {
  [key: string]: ActionCreator;
}

export declare type unionMap<C extends ActionCreatorMap> = ActionType<C[keyof C]>;

export const DashboardActions = {
  TOGGLE_PAUSE: action('[Dashboard] Toggle Pause', payload<string>())
};

export const HubActions = {
  SET_HUB_URL: action('[Hub] Set Hub URL'), // TODO
  STATUS_CHANGED: action('[Hub] Socket Status', payload<SocketEvent>()),
  GOT_META: action('[Hub] Got Meta', payload<MetaStore>()),
  RECEIVED_DATA: action('[Hub] Received Data', payload<WatchData>()),
  LOG_DATA: action('[Hub] Log Data', payload<LogEvent>()),
  ERROR_DATA: action('[Hub] Error Data', payload<ErrorEvent>())
};

export type HubActions = unionMap<typeof HubActions>;
export type DashboardActions = unionMap<typeof DashboardActions>;
