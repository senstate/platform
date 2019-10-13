import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'senstate-string-watcher',
  templateUrl: './string-watcher.component.html',
  styleUrls: ['./string-watcher.component.css']
})
export class StringWatcherComponent implements OnInit {

  @Input()
  public data: any;

  constructor() { }

  ngOnInit() {
  }

}
