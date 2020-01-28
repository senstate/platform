import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WatchersListComponent} from "./watchers-list.component";
import { ListJsonValueComponent } from './list-json-value/list-json-value.component';
import {JsonViewerModule} from "../../json-viewer/json-viewer.module";


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
  ]
})
export class WatchersListModule {
}
