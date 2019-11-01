import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogViewerComponent } from './log-viewer.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {MatTableModule} from "@angular/material/table";
import {LogLevelPipe} from "./log-level.pipe";

describe('LogViewerComponent', () => {
  let component: LogViewerComponent;
  let fixture: ComponentFixture<LogViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatTableModule ],
      declarations: [ LogViewerComponent, LogLevelPipe ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
