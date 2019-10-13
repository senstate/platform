import {someGuid} from "@senstate/client";
import * as WebSocket from "ws";

export class ConnectedClient {
  public id = someGuid();

  constructor (public socket: WebSocket) {

  }

  public send (event: string, data: any) {
    this.socket.send(JSON.stringify({event, data}));
  }
}
