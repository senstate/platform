# `@senstate/client` TS Client 

`npm install @senstate/client`

This library contains the JS/TS client code.

## Connect to Senstate

`npm install @senstate/client-connection`

```ts
import {setSenstateConnection} from "@senstate/client-connection";

setSenstateConnection({
  name: 'My Example App',
  // appId: 'customShortId' optional
}  /* , ws://localhost:3333 */); // custom hub-address, working locally you won't need to change the target address
```
Without calling `setStenstateConnection` all watchers/senders won't send anything to the Dashboard.

## Low-Level Senders

Those methods sending the data to the hub:

|   	|Watch|Log|Error|
|---	|---	|---	|---	|
|Function|Send the current value of a "tag"|Sends a log entry to the Hub|Subscribes to the window.onerror method, and send this to the Hub|
|Create|`const watcher = createWatchSender(tag: string, type?: WatchType)`|`const logger = createLogSender(logLevel: LogLevel = LogLevel.Info, logName?: string)`| `registerWindowErrorHandler()`   	|   	
|   	| |`const otherlogger = genericLogSender()`   	|   	|   	
|Send Data|`watcher(value)` |`logger(logMessage, data?, line?)`| Once an error happened it'll be sent  	|   	
|   	| |`otherlogger(GenericLogSenderArgs)`  (full params, use codecompletion :))  	|   	|   	

## Measure Utils

`TimeMeasurer` uses the time between `.start()` and `.stop` as value for the internal Watcher 

```ts
  const time = new TimeMeasurer(tag);
  time.start();
  // your work
  time.step();  // step can be called often, to get multiple updates, if called in a loop
```

## Decorators

Add `@PropertyWatcher(optionalWatcherTag)` to your class-property, uses a watcher internally to send the data

```ts
  @PropertyWatcher()
  public watchProperty = 0;

  @PropertyWatcher('otherKey')
  public watchOtherProperty = 0;
```

more to be added

## Promise() Helpers

Measure the time of a promise, and send the value

```ts
const result = await measurePromise(watchTag, () => myPromiseFunc());
```

## RXJS Pipes

```ts
import { SenstateOperators } from '@senstate/client';

myObservable$.pipe(
   SenstateOperators.watch('Watcher Tag'), // Watcher
)

other$.pipe(
   SenstateOperators.log('Log Name')
)

const time = new TimeMeasurer(tag);

trigger$.pipe(
   SenstateOperators.measureStart(time),
   mergeMap(() => longerObservableExecution$),
   SenstateOperators.measureStep(time)
)

```
 
