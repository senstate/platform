import {Subject} from "rxjs";

export const enum SocketEvent {
  Connecting,
  Connected,
  Error,
  Closed
};

export class Socket {
  private reconnectedCounter = 0;
  private socket: WebSocket;
  private connected = false;

  public socketEvents$ = new Subject<SocketEvent>();
  public dataEvents$ = new Subject<any>(); // TODO TYPE


  constructor (private address: string) {
    this.tryReconnect();
  }

  public sendJson(event: string, data: any) {
    if (this.connected) {
      this.socket.send(JSON.stringify({event, data}));
    }
  }

  private tryReconnect () {
    this.reconnectedCounter++;

    this.socketEvents$.next(SocketEvent.Connecting);

    this.socket = new WebSocket(this.address);

    this.socket.onmessage = ev => {
      this.dataEvents$.next(ev);
    };

    this.socket.onopen = (event) => {
      this.connected = true;
      this.socketEvents$.next(SocketEvent.Connected);
      this.reconnectedCounter = 0;
    };

    this.socket.onerror = (er) => {
      this.socketEvents$.next(SocketEvent.Error);
      console.error('Socket Exception', er);
      this.connected = false;
    };

    this.socket.onclose = () => {
      this.socketEvents$.next(SocketEvent.Closed);
      console.error('Socket Closed');
      this.connected = false;

      if (this.reconnectedCounter < 5) {
        setTimeout(() => this.tryReconnect(), 3500);
      }
    };
  }
}
