import { WatchSender, createWatchSender } from './watch-sender';
import { WatchType } from './interfaces';
import { mil } from './utils';

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
