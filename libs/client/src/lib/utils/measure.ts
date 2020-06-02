import { mil } from './utils';
import {CreateWatchPayload, createWatchSender, WatchSender} from "../sender/watch-sender";
import {WatchType} from "../interfaces";

export class TimeMeasurer {
  private readonly sender: WatchSender;
  private beganAt = -1;
  constructor (opt: CreateWatchPayload, private resetOnStep = false) {
    this.sender = createWatchSender({...opt, type: WatchType.Performance});
  }

  public start() {
    this.beganAt = mil();
  }

  public step () {
    const stopped = mil();
    this.sender(stopped - this.beganAt);

    if (this.resetOnStep) {
      this.start();
    }
  }
}
