import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppOverviewComponent } from './app-overview.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {MdePopoverModule} from "@material-extended/mde";
import {HubServiceMock, HubServiceMockProvider} from "@test-utils/mocks";
import {NEVER} from "rxjs";

describe('AppOverviewComponent', () => {
  let component: AppOverviewComponent;
  let fixture: ComponentFixture<AppOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdePopoverModule],
      declarations: [ AppOverviewComponent ],
      providers: [HubServiceMockProvider],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppOverviewComponent);
    component = fixture.componentInstance;
    HubServiceMock.getLatest().getLogs$ = appId => NEVER;
    HubServiceMock.getLatest().getErrors$ = appId => NEVER;
  });

  it('should create', () => {
    component.app = {appId: 'myApp', name: 'My App', client: '', watchers: {}};

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
