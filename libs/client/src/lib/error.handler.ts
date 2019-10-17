import {CONNECTION} from "./current-connection";

export function registerErrorHandler () {
  window.onerror = (event: Event | string, source?: string, lineno?: number, colno?: number, error?: Error) => {

    CONNECTION.current.sendError({
      errorName: error && error.name,
      message: error && error.message,
      line: lineno,
      stack: error && error.stack
    })
  }
}
