import {CONNECTION} from "./current-connection";

export function registerWindowErrorHandler () {
  window.onerror = (event: Event | string, source?: string, lineno?: number, colno?: number, error?: Error) => {

    CONNECTION.current.sendError({
      errorName: error && error.name,
      message: error && error.message,
      line: lineno,
      stack: error && error.stack
    })
  }
}

export class AngularErrorHandler {
  public handleError(error) {
    const message = (error.message || '').split('\n')[0];

    CONNECTION.current.sendError({
      errorName: error && error.name,
      message,
      stack: error && error.stack
    })
  }
}
