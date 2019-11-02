import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ErrorViewerComponent} from "./error-viewer.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {StacktracePipe} from "./stacktrace.pipe";



@NgModule({
  declarations: [
    ErrorViewerComponent,
    StacktracePipe
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule
  ],
  exports: [
    ErrorViewerComponent
  ]
})
export class ErrorViewerModule { }
