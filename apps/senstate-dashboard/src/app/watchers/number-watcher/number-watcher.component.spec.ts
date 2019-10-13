import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberWatcherComponent } from './number-watcher.component';

describe('NumberWatcherComponent', () => {
  let component: NumberWatcherComponent;
  let fixture: ComponentFixture<NumberWatcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberWatcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberWatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
