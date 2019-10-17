import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'senstate-json-viewer',
  templateUrl: './json-viewer.component.html',
  styleUrls: ['./json-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JsonViewerComponent {

  @Input()
  public data: any;

}
