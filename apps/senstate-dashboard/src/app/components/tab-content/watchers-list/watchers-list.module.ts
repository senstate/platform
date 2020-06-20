import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WatchersListComponent} from "./watchers-list.component";
import {ListJsonValueComponent} from './list-json-value/list-json-value.component';
import {JsonViewerModule} from "../../json-viewer/json-viewer.module";
import {SharedModule} from "../../shared/shared.module";
import {DynamicPortalModule} from "@gewd/ng-utils/dynamic-portal";
import {MatSelectModule} from "@angular/material/select";
import {CssPropsModule} from "../../../directives/css-props/css-props.module";


@NgModule({
  declarations: [
    WatchersListComponent,
    ListJsonValueComponent,
  ],
  exports: [
    WatchersListComponent,
  ],
  imports: [
    CommonModule,
    JsonViewerModule,
    SharedModule,
    DynamicPortalModule,
    MatSelectModule,
    CssPropsModule,
  ]
})
export class WatchersListModule {
}
