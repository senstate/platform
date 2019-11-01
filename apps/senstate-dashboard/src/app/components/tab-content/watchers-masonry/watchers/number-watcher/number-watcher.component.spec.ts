import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberWatcherComponent } from './number-watcher.component';
import {HubServiceMock, HubServiceMockProvider} from "@test-utils/mocks";
import {NEVER, of} from "rxjs";
import {StringWatcherComponent} from "../string-watcher/string-watcher.component";

describe('NumberWatcherComponent', () => {
  let component: NumberWatcherComponent;
  let fixture: ComponentFixture<NumberWatcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberWatcherComponent ],
      providers: [HubServiceMockProvider]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberWatcherComponent);
    HubServiceMock.getLatest().getWatcherData$ = watchId => NEVER;
    component = fixture.componentInstance;
  });

  it('no watch data - show no data send', () => {

    fixture.detectChanges();
    expect(component).toBeTruthy();

    expect(fixture.debugElement.nativeElement.textContent).toBe('no data send yet')
  });

  it('got watch data - shows it', () => {
    const data = 1234;
    HubServiceMock.getLatest().getWatcherData$ = watchId => of(data);
    component.watchId = 'anyId';
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(fixture.debugElement.nativeElement.textContent).toContain(data);
  });
});
