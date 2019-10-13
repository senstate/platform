import {TimeMeasurer} from './measure';

export async function measurePromise<T> (tag, p: () => Promise<T>): Promise<T> {
  const time = new TimeMeasurer(tag);
  time.start();
  const result = await p();
  time.step();
  return result;
}
