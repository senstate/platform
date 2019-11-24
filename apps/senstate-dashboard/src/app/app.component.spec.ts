import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {MdePopoverModule} from "@material-extended/mde";

describe.skip('AppComponent', () => {
  beforeEach(async (done) => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientModule, MdePopoverModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    done();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
