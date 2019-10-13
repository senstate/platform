import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StringWatcherComponent } from './string-watcher.component';

describe('StringWatcherComponent', () => {
  let component: StringWatcherComponent;
  let fixture: ComponentFixture<StringWatcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StringWatcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StringWatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
