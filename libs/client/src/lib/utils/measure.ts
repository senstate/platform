import { mil } from './utils';
import {createWatchSender, WatchSender} from "../sender/watch-sender";
import {WatchType} from "../interfaces";

export class TimeMeasurer {
  private readonly sender: WatchSender;
  private beganAt = -1;
  constructor (tag: string, private resetOnStep = false) {
    this.sender = createWatchSender(tag, WatchType.Performance);
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
