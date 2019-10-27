import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatcherCardComponent } from './watcher-card.component';

describe('WatcherCardComponent', () => {
  let component: WatcherCardComponent;
  let fixture: ComponentFixture<WatcherCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatcherCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatcherCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
