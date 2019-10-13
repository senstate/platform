Point your websocket connection to the cli `ws://ip:3333`

# 1. The sending app needs to "register"
Send following data to the event 'addApp':

```ts
export interface AppMeta {
  appId: string;  // just a short GUID, no special syntax needed
  name: string;   // your Apps Name, to differ in the dashboard
}
```

#2. Add a Watcher-Meta Info

Target: 'addWatcher'

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

# 3. Send the watcher-data

Event: 'inputEvent'

```ts
export interface WatchData {
  watchId: string;
  data: any;
}
```

# 4.  Logger

Event: 'inputLogEvent'

```ts
export interface LogData {
  log: any;
}
```
