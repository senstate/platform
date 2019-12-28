import {Pipe, PipeTransform} from "@angular/core";
import {Lazy} from "@gewd/lazy/utils";


// Lazy-load :)
const loadStacktracey = Lazy.create(
  () => import('stacktracey')
  .then(p => {
    const stacktracey = p.default;

    stacktracey.maxColumnWidths = {
      callee:     20,
      file:       30,
      sourceLine: 40
    };

    return stacktracey;
  })
);

@Pipe({
  name: 'stacktrace'
})
export class StacktracePipe implements PipeTransform {
  async transform (value: string): Promise<string> {
    const stacktracey = await loadStacktracey.getValue();

    const instance = new stacktracey(value);

    return instance.pretty.trim() || value; // fallback if it couldn't be parsed
  }
}
