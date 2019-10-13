import {NgModule} from '@angular/core';
import {HubService} from './hub.service';
import {HubEffects} from "./hub.effects";

@NgModule({
  imports: [

  ],
  providers: [
    HubService,
    HubEffects
  ]
})
export class HubModule {

}
