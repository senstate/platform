import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'senstate-json-watcher',
  templateUrl: './json-watcher.component.html',
  styleUrls: ['./json-watcher.component.css']
})
export class JsonWatcherComponent implements OnInit {

  @Input()
  public data: any;

  constructor() { }

  ngOnInit() {
  }

}
