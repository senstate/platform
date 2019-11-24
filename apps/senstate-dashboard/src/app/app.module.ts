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
import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects'
import {metaReducers, stateReducer} from "./state";
import {HubModule} from "./state/hub.module";
import {HubEffects} from "./state/hub.effects";
import {SenIconRegisterModule} from "@senstate/app-utils";
import {app_icons} from "./app.icons";
import {MatSliderModule} from "@angular/material/slider";
import {PrettyJsonModule} from "angular2-prettyjson";
import {MatTableModule} from "@angular/material/table";
import {CdkTableModule} from "@angular/cdk/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MaterialCssVarsModule} from "angular-material-css-vars";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatMenuModule} from "@angular/material/menu";
import {SocketService} from "./services/socket.service";
import {AppOverviewModule} from "./components/app-overview/app-overview.module";

// TODO Refactor Modules/Imports

@NgModule({
  declarations: [
    AppComponent,
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
    MatPaginatorModule,
    MaterialCssVarsModule.forRoot({
      // all optional
      isAutoContrast: true,
      darkThemeClass: 'isDarkTheme',
      lightThemeClass: 'isLightTheme',
      isDarkTheme: true,

      //      primary: '#3f51b5',
      //     accent: '#e91e63',
      //    warn: '#f44336',

      // ...
    }),
    MatCheckboxModule,
    MatMenuModule,
    AppOverviewModule,
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

