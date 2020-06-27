import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppOverviewComponent} from "./app-overview.component";
import {MatTabsModule} from "@angular/material/tabs";
import {MatBadgeModule} from "@angular/material/badge";
import {WatchersMasonryModule} from "../tab-content/watchers-masonry/watchers-masonry.module";
import {LogViewerModule} from "../tab-content/log-viewer/log-viewer.module";
import {ErrorViewerModule} from "../tab-content/error-viewer/error-viewer.module";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {MdePopoverModule} from "@material-extended/mde";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatDividerModule} from "@angular/material/divider";
import {WatchersListModule} from "../tab-content/watchers-list/watchers-list.module";
import {MatChipsModule} from "@angular/material/chips";
import {DynamicPortalModule, PortalHubService} from "@gewd/ng-utils/dynamic-portal";


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
        ErrorViewerModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatCheckboxModule,
        MatRadioModule,
        MdePopoverModule,
        MatOptionModule,
        MatSelectModule,
        MatDividerModule,
        WatchersMasonryModule,
        WatchersMasonryModule,
        WatchersListModule,
        MatChipsModule,
        DynamicPortalModule
    ],
  providers: [
    PortalHubService
  ]
})
export class AppOverviewModule { }
