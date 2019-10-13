import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'senstate-number-watcher',
  templateUrl: './number-watcher.component.html',
  styleUrls: ['./number-watcher.component.css']
})
export class NumberWatcherComponent implements OnInit {

  @Input()
  public data: any;

  @Input()
  public min: any;

  @Input()
  public max: any;

  constructor() { }

  ngOnInit() {
  }

}
