import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ChangeDetectorRef, AfterViewInit
} from '@angular/core';
import {LogEvent} from "@senstate/dashboard-connection";
import {LogData} from "@senstate/client";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'senstate-log-viewer',
  templateUrl: './log-viewer.component.html',
  styleUrls: ['./log-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogViewerComponent implements OnInit, AfterViewInit, OnChanges {
  @Input()
  public logArray: LogData[];

  displayedColumns: (keyof LogData)[] = ['dateIso','logLevel', 'logName', 'log'];
  secondRowColumns: (keyof LogData)[] = ['data'];


  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort, {static: true}) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator, {static: true}) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }


  dataSource = new MatTableDataSource([]);

  constructor(private cd: ChangeDetectorRef) {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['logArray']) {
      this.dataSource = new MatTableDataSource(this.logArray || []);
      this.setDataSourceAttributes();
    }
  }

  showRow (_, l: LogData) {
    return !!l.data;
  }

  setDataSourceAttributes() {
    if (this.dataSource.data && this.dataSource.data.length > 0) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      if (this.paginator && this.sort) {
        this.applyFilter('');
      }
      this.cd.detectChanges();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
