import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorViewerComponent } from './error-viewer.component';
import {MatTableModule} from "@angular/material/table";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('ErrorViewerComponent', () => {
  let component: ErrorViewerComponent;
  let fixture: ComponentFixture<ErrorViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatTableModule ],
      declarations: [ ErrorViewerComponent ],
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
