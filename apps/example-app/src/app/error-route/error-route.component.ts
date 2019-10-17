import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'senstate-error-route',
  templateUrl: './error-route.component.html',
  styleUrls: ['./error-route.component.css']
})
export class ErrorRouteComponent implements OnInit {

  constructor() {
    throw new Error('Nope, error during constructor, should fire an angular error?');
  }

  ngOnInit() {
  }

}
