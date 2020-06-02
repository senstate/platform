import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WatchersMasonryComponent } from './watchers-masonry.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {HubServiceMock, HubServiceMockProvider} from "@test-utils/mocks";
import {NEVER} from "rxjs";

describe('WatchersMasonryComponent', () => {
  let component: WatchersMasonryComponent;
  let fixture: ComponentFixture<WatchersMasonryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchersMasonryComponent ],
      providers: [
        HubServiceMockProvider
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchersMasonryComponent);
    HubServiceMock.getLatest().getWatchersByApp$ = appId => NEVER;
    HubServiceMock.getLatest().getGroupedWatchersByApp$ = appId => NEVER;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
