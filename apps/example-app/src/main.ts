import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {registerWindowErrorHandler} from "@senstate/client";
import {setSenstateConnection} from "@senstate/client-connection";

setSenstateConnection({
  name: 'My Example App'
});

registerWindowErrorHandler();

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
