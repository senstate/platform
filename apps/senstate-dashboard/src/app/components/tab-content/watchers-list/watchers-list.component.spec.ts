import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchersListComponent } from './watchers-list.component';

describe('WatchersListComponent', () => {
  let component: WatchersListComponent;
  let fixture: ComponentFixture<WatchersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
