import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WatchersMasonryComponent} from './watchers-masonry.component';
import {NgxMasonryModule} from "ngx-masonry";
import {HistoryTemplateDirective, WatcherCardComponent} from "./watcher-card/watcher-card.component";
import {JsonWatcherComponent} from "./watchers/json-watcher/json-watcher.component";
import {StringWatcherComponent} from "./watchers/string-watcher/string-watcher.component";
import {NumberWatcherComponent} from "./watchers/number-watcher/number-watcher.component";
import {MatCardModule} from "@angular/material/card";
import {JsonViewerModule} from "../../json-viewer/json-viewer.module";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {WatchHistoryComponent} from './watchers/watch-history/watch-history.component';
import {WatchDiffComponent} from "./watchers/watch-diff/watch-diff.component";
import {SharedModule} from "../../shared/shared.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {DynamicPortalModule} from "@gewd/ng-utils/dynamic-portal";


@NgModule({
  declarations: [
    WatchersMasonryComponent,
    NumberWatcherComponent,
    StringWatcherComponent,
    JsonWatcherComponent,
    WatcherCardComponent,
    WatchHistoryComponent,
    HistoryTemplateDirective,
    WatchDiffComponent
  ],
  exports: [
    WatchersMasonryComponent,
  ],
    imports: [
        CommonModule,

        NgxMasonryModule,
        MatCardModule,
        JsonViewerModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule,
        SharedModule,
        MatFormFieldModule,
        DynamicPortalModule
    ]
})
export class WatchersMasonryModule {
}
