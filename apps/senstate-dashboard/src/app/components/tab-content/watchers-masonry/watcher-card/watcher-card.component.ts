import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'senstate-watcher-card',
  templateUrl: './watcher-card.component.html',
  styleUrls: ['./watcher-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WatcherCardComponent implements OnInit {
  @Input()
  public title: string;

  @Input()
  public showMenu: boolean;

  constructor() { }

  ngOnInit() {
  }

}
