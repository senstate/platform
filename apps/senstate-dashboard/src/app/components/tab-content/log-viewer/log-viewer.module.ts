import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LogViewerComponent} from "./log-viewer.component";
import {LogLevelPipe} from "./log-level.pipe";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {JsonViewerModule} from "../../json-viewer/json-viewer.module";



@NgModule({
  declarations: [
    LogViewerComponent,
    LogLevelPipe,
  ],
  exports: [
    LogViewerComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    JsonViewerModule,
  ]
})
export class LogViewerModule { }
