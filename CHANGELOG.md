# Changelog

## [0.3] - soon

### Added

- Dashboard: Search for the error on multiple search engines
- Dashboard: Show string + json diff
- Dashboard: new View-Type: List watchers instead of masonry grid
- API: Add response actions
- API: Add group param to a Watcher

### Breaking Changes `@senstate/client`

Due to the `group` feature, all helper functions derived from
`createWatchSender` changed to an object:

```ts
// old syntax
const watcher = createWatchSender(tag: string, type?: WatchType);

// new syntax
const watcher = createWatchSender({
  tag: string,
  group?: string,
  type?: WatchType
});
```

the same object will be used on:

- `new TimeMeasurer(obj)`
- `@PropertyWatcher`
- `measurePromise`
- `SenstateOperators.watch`

## [0.2.1] - 2019-11-24

### Added

- Dashboard: Extend / pretty-print JavaScript-Errors with [`stacktracey`]
- Dashboard: Ability to show last 5 values per Watcher

[`stacktracey`]: https://www.npmjs.com/package/stacktracey

## [0.2.0] - 2019-10-28

Start of Changelog
