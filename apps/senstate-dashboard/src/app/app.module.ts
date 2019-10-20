import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatExpansionModule, MatIconModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
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
import {SenIconRegisterModule} from "@senstate/app-utils";
import {app_icons} from "./app.icons";
import {MatSliderModule} from "@angular/material/slider";
import {PrettyJsonModule} from "angular2-prettyjson";
import { JsonViewerComponent } from './components/json-viewer/json-viewer.component';
import { LogViewerComponent } from './components/log-viewer/log-viewer.component';
import {MatTableModule} from "@angular/material/table";
import {CdkTableModule} from "@angular/cdk/table";
import {LogLevelPipe} from "./components/log-viewer/log-level.pipe";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import { ErrorViewerComponent } from './components/error-viewer/error-viewer.component';

@NgModule({
  declarations: [
    AppComponent, NumberWatcherComponent, StringWatcherComponent,
    JsonWatcherComponent, JsonViewerComponent, LogViewerComponent,
    LogLevelPipe,
    ErrorViewerComponent
  ],
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
    MdePopoverModule,
    SenIconRegisterModule.register({
      svgFolder: 'assets/svg',
      icons: app_icons
    }),
    MatSliderModule,
    PrettyJsonModule,
    MatTableModule,
    CdkTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [
    SocketService,


  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor () {
  }
}

