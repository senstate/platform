import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MatButtonModule, MatInputModule, MatSelectModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AngularErrorHandler} from "@senstate/client";
import {RouterModule} from "@angular/router";
import { ErrorRouteComponent } from './error-route/error-route.component';



@NgModule({
  declarations: [AppComponent, ErrorRouteComponent],
  imports: [
    BrowserModule, MatButtonModule, MatSelectModule,
    BrowserAnimationsModule, MatInputModule,
    RouterModule.forRoot([
      {
        path: 'test',
        component: ErrorRouteComponent
      }
    ])
  ],
  providers: [
    {provide: ErrorHandler, useClass: AngularErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

setTimeout(() => {
  let foo: any;

  foo.baz();
}, 1500);

