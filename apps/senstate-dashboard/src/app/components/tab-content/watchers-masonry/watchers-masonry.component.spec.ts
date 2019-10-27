import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchersMasonryComponent } from './watchers-masonry.component';

describe('WatchersMasonryComponent', () => {
  let component: WatchersMasonryComponent;
  let fixture: ComponentFixture<WatchersMasonryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchersMasonryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchersMasonryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
