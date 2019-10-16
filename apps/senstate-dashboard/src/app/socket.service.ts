import {Injectable, NgZone} from "@angular/core";
import {environment} from "../environments/environment";
import {Socket} from "@senstate/client-connection";
import {filter, map, tap} from "rxjs/operators";
import {enterZone} from "@senstate/app-utils";

const config = {
  url: environment.apiUrl, options: {}
};


// TODO REMOVE?!
@Injectable()
export class SocketService {
  public socket: Socket;

  constructor (private ngZone: NgZone) {
    this.socket = new Socket(config.url);

  }

  fromEvent<T> (eventType: string) {
    return this.ngZone.runOutsideAngular(() => {
      return this.socket.dataEvents$.pipe(
        filter(ev => ev.data.includes(eventType)),
        map(ev => JSON.parse(ev.data)),
        map(parsed => parsed.data),
        enterZone(this.ngZone)
        // tap(e => console.info('received ', e)),
      );
    }
  )
  }
}
