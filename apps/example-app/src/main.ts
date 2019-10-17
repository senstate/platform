import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {registerErrorHandler} from "@senstate/client";
import {setSenstateConnection} from "@senstate/client-connection";

setSenstateConnection({
  name: 'My Example App'
});

registerErrorHandler();

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
