# `@senstate/client` TS Client

[![NPM Version][client-npm-img]][client-npm-url]
[![Package Size][client-size-img]][client-size-url]
[![Known Vulnerabilities][client-snyk-img]][client-snyk-url]

[client-npm-img]: https://img.shields.io/npm/v/@senstate/client.svg?
[client-npm-url]: https://www.npmjs.com/package/@senstate/client
[client-size-img]: https://img.shields.io/bundlephobia/minzip/@senstate/client.svg
[client-size-url]: https://bundlephobia.com/result?p=@senstate/client
[client-snyk-img]: https://snyk.io/test/npm/@senstate/client/badge.svg
[client-snyk-url]: https://snyk.io/test/npm/@senstate/client

`npm install @senstate/client`

This library contains the JS/TS client code.

## Connect to Senstate (`@senstate/client-connection`)

[![NPM Version][con-npm-img]][con-npm-url]
[![Package Size][con-size-img]][con-size-url]
[![Known Vulnerabilities][con-snyk-img]][con-snyk-url]

[con-npm-img]: https://img.shields.io/npm/v/@senstate/client-connection.svg?
[con-npm-url]: https://www.npmjs.com/package/@senstate/client-connection
[con-size-img]: https://img.shields.io/bundlephobia/minzip/@senstate/client-connection.svg
[con-size-url]: https://bundlephobia.com/result?p=@senstate/client-connection
[con-snyk-img]: https://snyk.io/test/npm/@senstate/client-connection/badge.svg
[con-snyk-url]: https://snyk.io/test/npm/@senstate/client-connection

`npm install @senstate/client-connection`

```ts
import {setSenstateConnection} from "@senstate/client-connection";

setSenstateConnection({
  name: 'My Example App',
  // appId: 'customShortId' optional
}  /* , ws://localhost:3333 */);

// second parameter is a custom hub-address, working locally you won't need to change this
```

Without calling `setSenstateConnection` all watchers/senders won't send anything to the Dashboard.

## Low-Level Senders

Those methods sending the data to the hub:

<!-- markdownlint-disable MD013 -->
|    |Watch|Log|Error|
|--- |--- |--- |--- |
|Function|Send the current value of a "tag"|Sends a log entry to the Hub|Subscribes to the window.onerror method, and send this to the Hub|
|Create|`const watcher = createWatchSender({tag: string, group?: string, type?: WatchType})`|`const logger = createLogSender(logLevel: LogLevel = LogLevel.Info, logName?: string)`| `registerWindowErrorHandler()`    |
|    | |`const otherLogger = genericLogSender()`    |    |
|Send Data|`watcher(value)` |`logger(logMessage, data?, line?)`| Once an error happened it'll be sent   |
|    | |`otherLogger(GenericLogSenderArgs)`  (full params, use code completion :))   |    |
<!-- markdownlint-enable MD013 -->

## Measure Utils

`TimeMeasurer` uses the time between `.start()` and `.stop` as value for the internal Watcher

```ts
  const time = new TimeMeasurer({tag: string, group?: string});
  time.start();
  // your work
  time.step();  // step can be called often, to get multiple updates, if called in a loop
```

## Decorators

Add `@PropertyWatcher({tag: string, group?: string})` to your class-property, uses a watcher internally to
send the data

```ts
  @PropertyWatcher()
  public watchProperty = 0;

  @PropertyWatcher({tag: 'otherKey', group: 'Important'})
  public watchOtherProperty = 0;
```

more to be added

## Promise() Helpers

Measure the time of a promise, and send the value

```ts
const result = await measurePromise({tag: string, group?: string}, () => myPromiseFunc());
```

## RXJS Pipes

```ts
import { SenstateOperators } from '@senstate/client';

myObservable$.pipe(
   SenstateOperators.watch({tag: 'Watcher Tag', group: 'optional'}), // Watcher
)

other$.pipe(
   SenstateOperators.log('Log Name')
)

const time = new TimeMeasurer({tag: 'Measurer Tag', group: 'optional'});

trigger$.pipe(
   SenstateOperators.measureStart(time),
   mergeMap(() => longerObservableExecution$),
   SenstateOperators.measureStep(time)
)
```
