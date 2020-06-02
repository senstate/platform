import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ExampleAppModule } from './app/example-app.module';
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
  .bootstrapModule(ExampleAppModule)
  .catch(err => console.error(err));
