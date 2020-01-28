import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListJsonValueComponent } from './list-json-value.component';

describe('ListJsonValueComponent', () => {
  let component: ListJsonValueComponent;
  let fixture: ComponentFixture<ListJsonValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListJsonValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListJsonValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
