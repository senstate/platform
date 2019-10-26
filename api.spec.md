# API V0.1.4

Point your websocket connection to the hub `ws://ip:3333`

## Event Types
Generic Event, sent as json to the hub
```ts
interface EventType<T> {
  event: string,
  data: T; // one of the following
}
```

Events
```ts
export interface AppMeta {
  appId: string;  // just a short GUID, no special syntax needed
  name: string;   // your Apps Name, to differ in the dashboard
}
```
```ts
export const enum WatchType {
  String,   // 0
  Number,
  Json,
  Performance
}

export interface WatcherMeta {
  watchId: string; // short guid
  tag: string;     // visible tag, like "my current var of Y"
  type: WatchType; 
}
```

```ts
export interface WatchData {
  watchId: string;
  data: any;
}
```

```ts
export interface LogData {
  log: any;
}
```

# 1. The sending app needs to "register"
event `addApp`

data `AppMeta`


#2. Add a Watcher-Meta Info
event `addWatcher`

data `WatcherMeta`


# 3. Send the watcher-data
event `inputEvent`

data `WatchData`

# 4.  Logger
event `inputLogEvent`

data `LogData`

