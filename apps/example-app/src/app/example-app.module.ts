import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import {ExampleAppComponent} from './example-app.component';
import {MatButtonModule, MatInputModule, MatSelectModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AngularErrorHandler} from "@senstate/client";
import {RouterModule} from "@angular/router";
import { ErrorRouteComponent } from './error-route/error-route.component';

@NgModule({
  declarations: [ExampleAppComponent, ErrorRouteComponent],
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
  bootstrap: [ExampleAppComponent]
})
export class ExampleAppModule {
}

setTimeout(() => {
  let foo: any;

  // noinspection JSUnusedAssignment
  foo.baz(); // lgtm [js/property-access-on-non-object]
}, 4500);

