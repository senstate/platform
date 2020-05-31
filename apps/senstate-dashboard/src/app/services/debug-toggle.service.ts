import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DebugToggleService {
  private showIdSubject = new BehaviorSubject(false);

  constructor() { }

  public showDebugId$ () {
    return this.showIdSubject.asObservable();
  }

  public toggle() {
    const current = this.showIdSubject.value;

    this.showIdSubject.next(!current);
  }
}
