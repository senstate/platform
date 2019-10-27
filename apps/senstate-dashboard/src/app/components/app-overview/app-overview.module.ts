import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppOverviewComponent} from "./app-overview.component";
import {MatTabsModule} from "@angular/material/tabs";
import {MatBadgeModule} from "@angular/material/badge";
import {WatchersMasonryModule} from "../tab-content/watchers-masonry/watchers-masonry.module";
import {LogViewerModule} from "../tab-content/log-viewer/log-viewer.module";
import {ErrorViewerModule} from "../tab-content/error-viewer/error-viewer.module";



@NgModule({
  declarations: [AppOverviewComponent],
  exports: [
    AppOverviewComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatBadgeModule,
    WatchersMasonryModule,
    LogViewerModule,
    ErrorViewerModule
  ]
})
export class AppOverviewModule { }
