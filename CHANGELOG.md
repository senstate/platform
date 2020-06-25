# Changelog

## [0.3.1] - 25.06.2020

### Added

- Dashboard: Show Groups (List Mode) in columns + ability to select more columns
- Dashboard: Show Watchers in Groups (List Mode) in columns + ability to select more columns
- Dashboard: Save/Restore following settings, when using the same Browser (localStorage):
  - Theme
  - View Mode
  - Masonry min-width
- Dashboard: Add Update counter



### Styling:

- Dashboard: Better styling List Mode


## [0.3] - 2020-06-02

### Added

- Dashboard: Search for the error on multiple search engines
- Dashboard: Show string + json diff
- Dashboard: new View-Type: List watchers instead of masonry grid
- Dashboard: show watchers in a grouped-way (if you don't set up a group, then the label is just hidden)
- API: Add response actions
- API: Add group param to a Watcher
- Client: Log-Only Mode, in case the client-connection wasn't called yet.

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
