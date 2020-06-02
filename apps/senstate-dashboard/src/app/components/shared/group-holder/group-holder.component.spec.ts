import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupHolderComponent } from './group-holder.component';

describe('GroupHolderComponent', () => {
  let component: GroupHolderComponent;
  let fixture: ComponentFixture<GroupHolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupHolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
