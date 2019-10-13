import {DASHBOARD_EVENT_NAMES, MetaStore} from "@senstate/dashboard-connection";
import {ReplaySubject} from "rxjs";
import {AppMeta, WatcherMeta} from "@senstate/client";
import {ConnectedClient} from "./connectedClient";

export class StateService {
  public meta$ = new ReplaySubject();
  public metaStore: MetaStore = {
    apps: {}
  };
  public clientToApp: {
    [key: string]: string
  } = {};

  private readonly logger = console;

  constructor () {

  }

  appConnected (socket: ConnectedClient, data: AppMeta) {
    const clientId = socket.id;
    try {
      this.metaStore.apps[data.appId] = {
        ...data,
        client: clientId,
        watchers: {}
      };

      this.clientToApp[clientId] = data.appId;
      this.sendMeta();

      this.logger.log(`Added App: ${data.appId}`);
    } catch (e) {
      this.logger.error(e);
    }
  }

  appDisconnected (client: ConnectedClient): any {
    const appId = this.clientToApp[client.id];
    delete this.metaStore.apps[appId];
    this.logger.log(`Removed AppId ${appId}`);

    this.sendMeta();
  }

  dashboardNeedMeta(client: ConnectedClient) {
    client.send(DASHBOARD_EVENT_NAMES.META, this.metaStore);
  }

  private sendMeta () {
    console.warn('sending out meta');
    this.meta$.next(this.metaStore);
  }

  addWatcher (client: ConnectedClient, data: WatcherMeta) {
    try {
      const clientId = client.id;
      const appId = this.clientToApp[clientId];
      this.metaStore.apps[appId].watchers[data.watchId] = data;
      this.sendMeta();

      this.logger.log(`Added Watcher [App ${appId}]: ${data.watchId}`);
    } catch (e) {
      this.logger.error(e);
    }
  }
}
