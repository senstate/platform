# API v0.3.X

This is the current API specification for clients that want to connect and send events to the
Senstate hub.

## Connecting

Point your websocket connection to the hub `ws://<ip>:3333`. Replace `<ip>` with the IP of the
machine where the hub runs, or simply `localhost` if client and hub run on the same machine.

## General payload

All of the following events are encapsulated in a structure and paired with an event name.
The event name can be one of these:

| `Event`           | Description                                        |
| ----------------- | -------------------------------------------------- |
| `addApp`          | [Register the app.](#registering-the-app)          |
| `addWatcher`      | [Register a new watcher.](#register-a-new-watcher) |
| `inputEvent`      | [Send watcher data.](#send-watcher-data)           |
| `inputLogEvent`   | [Send a log event.](#send-logs)                    |
| `inputErrorEvent` | [Send an error.](#send-errors)                     |

The encapsulating payload looks as follows:

```json
{ "event": "addApp", "data": { } }
```

| Property | Type    | Description                            |
| -------- | ------- | -------------------------------------- |
| event    | `Event` | Any of above mentioned event names.    |
| data     |         | One of the following described events. |

## Registering the app

- Event `addApp`.

Registering an app requires a unique identifier and a name that's shown in the dashboard.

> The calling client, will receive the response event `appAdded`

### AppMeta

| Property   | Type     | Description                                   |
| ---------- | -------- | --------------------------------------------- |
| appId      | string   | A short unique identifier, UUIDs recommended. |
| name       | string   | The app name.                                 |

## Register a new watcher

- Event `addWatcher`.

Registering a new watcher requires a unique identifier, some tag that is show in the dashboard and a
type to describe what kind of data the watcher represents.

> The calling client, will receive the response event `watcherAdded`

### `WatchType`

| Name        | Value | Description                |
| ----------- | ----- | -------------------------- |
| String      | 0     | String values.             |
| Number      | 1     | Any number (ints, floats). |
| Json        | 2     | JSON content.              |
| Performance | 3     | Identical to `Number`.     |

### WatcherMeta

| Property | Type        | Description                                                            |
| -------- | ----------- | ---------------------------------------------------------------------- |
| watchId  | string      | A short unique identifier, UUIDs recommended.                          |
| tag      | string      | Visible name of the variable.                                          |
| group    | string      | Group watcher to this label, every group has to be the same to match it |
| type     | `WatchType` | One of the above watcher types.                                        |

## Send watcher data

- Event `inputEvent`.

After registering a watcher, data can be send for it. The ID must be the same and the data should
match the `WatchType`.

### WatchData

| Property | Type   | Description                                      |
| -------- | ------ | ------------------------------------------------ |
| watchId  | string | Identifier of the previously registered watcher. |
| data     | any    | The actual data depending on the `WatchType`.    |

## Send logs

- Event `inputLogEvent`.

The application can send logging events to show on the dashboard. At the minimum a log can be just a
simple message. If available from the client side, it can also contain the log name, level, line of
occurrence and any additional data.

### `LogLevel`

| Name  | Value | Description                              |
| ----- | ----- | ---------------------------------------- |
| Debug | 0     | Low level debugging info.                |
| Info  | 1     | General information level.               |
| Warn  | 2     | Warning about something that went wrong. |
| Error | 3     | Critical errors.                         |

### LogData

| Property | Type       | Optional | Description                                   |
| -------- | ---------- | -------- | --------------------------------------------- |
| log      | any        | 🚫       | The actual log message.                       |
| logName  | string     | 👍       | Name of the logger.                           |
| logLevel | `LogLevel` | 👍       | Severity level, defaults to `Info`.           |
| line     | number     | 👍       | The line where the log was created.           |
| data     | any        | 👍       | Any additional (structured) data for the log. |

## Send errors

- Event `inputErrorEvent`.

Similar to logs, an application can also send errors to show on the dashboard. Again, the minimal
error contains a simple message. It can be extended with an error name, line number, method name and
stack trace if available.

### ErrorData

| Property   | Type   | Optional | Description                                  |
| ---------- | ------ | -------- | -------------------------------------------- |
| message    | string | 🚫       | The error message.                           |
| errorName  | string | 👍       | Name of the error.                           |
| line       | number | 👍       | Line where the errors occurred.              |
| methodName | string | 👍       | Name of the method where the error occurred. |
| stack      | string | 👍       | Stack trace.                                 |
