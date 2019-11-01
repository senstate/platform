import {ineeda} from "ineeda";
import {HubService} from "../../apps/senstate-dashboard/src/app/state/hub.service";

export const HubServiceMock = ineeda.factory<HubService>({});
export const HubServiceMockProvider =  {
  provide: HubService,
  useClass: HubServiceMock
};
