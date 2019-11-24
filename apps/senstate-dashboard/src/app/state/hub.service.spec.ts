import {HubService} from "./hub.service";
import {ineeda} from "ineeda";
import {Store} from "@ngrx/store";
import {NEVER} from "rxjs";

describe('HubService', () => {
  let hubService: HubService;
  let dispatchSpy = jest.spyOn({dispatch: () => {}}, 'dispatch');

  beforeEach(() => {
    const storeMock = ineeda<Store<any>>({
      select: mapFn => NEVER,
      dispatch: dispatchSpy as any // todo test type..
    });

    hubService = new HubService(storeMock);
  });

  it('should create the service', () => {
    expect(hubService).toBeTruthy();
  });

  it('example data pushes actions', () => {
    var subscription = hubService.startExampleData();
    subscription.unsubscribe();

    expect(dispatchSpy).toBeCalledTimes(6);
  });
});
