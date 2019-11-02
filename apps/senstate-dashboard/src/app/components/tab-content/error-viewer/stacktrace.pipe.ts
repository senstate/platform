import {Pipe, PipeTransform} from "@angular/core";

// Lazy-load :)
const loadStacktracey = () => import('stacktracey')
  .then(p => {
    const stacktracey = p.default;

    stacktracey.maxColumnWidths = {
      callee:     20,
      file:       30,
      sourceLine: 40
    };

    return stacktracey;
  });

let loadedStacktracey = null;

@Pipe({
  name: 'stacktrace'
})
export class StacktracePipe implements PipeTransform {
  async transform (value: string): Promise<string> {
    const stacktracesPromise = (loadedStacktracey
      || (loadedStacktracey = loadStacktracey()));

    const stacktracey = await stacktracesPromise;

    const instance = new stacktracey(value);

    console.info(instance);

    return new stacktracey (value).pretty;
  }

}
