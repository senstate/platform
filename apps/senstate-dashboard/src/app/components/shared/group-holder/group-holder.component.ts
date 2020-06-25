import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'senstate-group-holder',
  templateUrl: './group-holder.component.html',
  styleUrls: ['./group-holder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupHolderComponent implements OnInit {

  @Input()
  public showGroupName = false;

  constructor() { }

  ngOnInit() {
  }

}
