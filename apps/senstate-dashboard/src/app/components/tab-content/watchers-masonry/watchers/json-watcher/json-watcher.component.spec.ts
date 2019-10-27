import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonWatcherComponent } from './json-watcher.component';

describe('JsonWatcherComponent', () => {
  let component: JsonWatcherComponent;
  let fixture: ComponentFixture<JsonWatcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonWatcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonWatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
