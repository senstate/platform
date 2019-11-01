import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StringWatcherComponent } from './string-watcher.component';
import {HubService} from "../../../../../state/hub.service";
import {NEVER, of} from "rxjs";
import {ineeda} from "ineeda";
import {CommonModule} from "@angular/common";

const HubServiceMock = ineeda.factory<HubService>({});

describe('StringWatcherComponent', () => {
  let component: StringWatcherComponent;
  let fixture: ComponentFixture<StringWatcherComponent>;

  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [ StringWatcherComponent ],
      providers: [
        {
          provide: HubService,
          useClass: HubServiceMock
        }
      ]
    })
    .compileComponents()
  ));

  it('no watch data - show no data send', () => {
    fixture = TestBed.createComponent(StringWatcherComponent);
    HubServiceMock.getLatest().getWatcherData$ = watchId => NEVER;
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();

    expect(fixture.debugElement.nativeElement.textContent).toBe('no data send yet')
  });

  it('got watch data - shows it', async (done) => {
    const data =  'some string';
    fixture = TestBed.createComponent(StringWatcherComponent);
    HubServiceMock.getLatest().getWatcherData$ = watchId => of(data);
    component = fixture.componentInstance;
    component.watchId = 'anyId';
    fixture.detectChanges();
    expect(component).toBeTruthy();

    await fixture.whenRenderingDone();

    expect(fixture.debugElement.nativeElement.textContent).toContain(data);

    done();
  });
});
