import {Component, OnInit, ChangeDetectionStrategy, Input, TemplateRef} from '@angular/core';
import {Observable} from "rxjs";
import {HubService} from "../../../../../state/hub.service";
import * as jsondiffpatch from "jsondiffpatch";

import * as disparity from 'disparity';
import * as xss from 'xss';
import {DomSanitizer} from "@angular/platform-browser";

disparity.added = '';
disparity.removed = '';
disparity.colors = {
  // chars diff
  charsRemoved: { open: "<span class='removed'>", close: '</span>' },
  charsAdded: { open: "<span class='added'>", close: '</span>' },
};

@Component({
  selector: 'senstate-watch-diff',
  templateUrl: './watch-diff.component.html',
  styleUrls: ['./watch-diff.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WatchDiffComponent implements OnInit {
  @Input()
  public watchId: string;

  public data$ : Observable<string[]>;

  @Input()
  public template: TemplateRef<any>;
  private lastValue: any;

  constructor (private hubService: HubService,
               private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.data$ = this.hubService.getWatcherData$(this.watchId);
  }

  valueDiff(right) {
    const left  = this.lastValue;

    if (typeof right === 'string' || typeof right === 'number') {
      const result = disparity.chars(left+''||'', right+'');

      this.lastValue = right;

      return result;
    } else {
    var delta = jsondiffpatch.diff(left, right);

    // beautiful html diff
    const result = jsondiffpatch.formatters.html.format(delta, left);

    this.lastValue = right;

    return result;
    }
  }

  safeDiff (value) {
    const result = this.valueDiff(value);

    const sanatized = xss.filterXSS(result, {
      whiteList: {
        ...xss.whiteList,
        span: ['class'],
        div: ['class'],
        ul: ['class'],
        li: ['class'],
      }
    });

    return this.sanitizer.bypassSecurityTrustHtml(sanatized);
  }
}
