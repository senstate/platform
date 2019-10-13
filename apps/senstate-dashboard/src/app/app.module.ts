import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatExpansionModule, MatIconModule, MatIconRegistry,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {environment} from '../environments/environment';
import { QRCodeModule } from 'angular2-qrcode';
import {MdePopoverModule} from "@material-extended/mde";
import {RouterModule} from "@angular/router";
import { NumberWatcherComponent } from './watchers/number-watcher/number-watcher.component';
import { StringWatcherComponent } from './watchers/string-watcher/string-watcher.component';
import { JsonWatcherComponent } from './watchers/json-watcher/json-watcher.component';
import {SocketService} from "./socket.service";
import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'
import {metaReducers, stateReducer} from "./state";
import {HubModule} from "./state/hub.module";
import {HubEffects} from "./state/hub.effects";

@NgModule({
  declarations: [AppComponent, NumberWatcherComponent, StringWatcherComponent, JsonWatcherComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    HubModule,
    RouterModule.forRoot([], {
      useHash: true
    }),
    StoreModule.forRoot(stateReducer, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([
      HubEffects
    ]),
    BrowserAnimationsModule,
    MatCardModule,
    QRCodeModule,
    MatExpansionModule,
    MatTabsModule,
    MatBadgeModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MdePopoverModule
  ],
  providers: [
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor (iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    registerIcons(iconRegistry, sanitizer);
  }
}


export const icons = [
  'important_devices'
];

export function registerIcons (iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
  for (const icon of icons) {
    iconRegistry.addSvgIcon(
      icon,
      sanitizer.bypassSecurityTrustResourceUrl(`assets/svg/${icon}.svg`));
  }
}
