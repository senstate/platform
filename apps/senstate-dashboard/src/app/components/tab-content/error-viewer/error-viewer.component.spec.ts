import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorViewerComponent } from './error-viewer.component';
import {MatTableModule} from "@angular/material/table";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {StacktracePipe} from "./stacktrace.pipe";
import {MdePopoverModule} from "@material-extended/mde";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";

describe('ErrorViewerComponent', () => {
  let component: ErrorViewerComponent;
  let fixture: ComponentFixture<ErrorViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatTableModule,     MdePopoverModule,
        MatButtonModule,
        MatIconModule,
        MatListModule ],
      declarations: [ ErrorViewerComponent, StacktracePipe ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
