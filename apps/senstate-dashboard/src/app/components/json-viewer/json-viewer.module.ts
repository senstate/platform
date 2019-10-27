import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {JsonViewerComponent} from "./json-viewer.component";
import {PrettyJsonModule} from "angular2-prettyjson";



@NgModule({
  declarations: [
    JsonViewerComponent
  ],
  exports: [
    JsonViewerComponent
  ],
  imports: [
    CommonModule,
    PrettyJsonModule
  ]
})
export class JsonViewerModule { }
