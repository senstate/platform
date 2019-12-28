import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  ChangeDetectorRef,
  SimpleChanges, OnChanges
} from '@angular/core';
import {ErrorData} from "@senstate/client";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

// TODO Extract table component with paginator / filter/ sort

@Component({
  selector: 'senstate-error-viewer',
  templateUrl: './error-viewer.component.html',
  styleUrls: ['./error-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorViewerComponent implements OnInit, OnChanges {
  @Input()
  public errorArray: ErrorData[];

  displayedColumns: (keyof ErrorData)[] = ['errorName', 'methodName', "message"];
  secondRowColumns: (keyof ErrorData)[] = ['stack'];


  private selectedError: ErrorData;
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['errorArray']) {
      this.dataSource = new MatTableDataSource(this.errorArray || []);
      this.setDataSourceAttributes();
    }
  }

  showRow (_, l: ErrorData) {
    return !!l.stack;
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

  markElementForSearch (element: ErrorData) {
    this.selectedError = element;
  }

  searchOnGoogle () {
    this.openUrl(`https://www.google.com/search?q=${this.escapedSearchTerm()}`)

  }

  searchOnDuckDuck () {
    this.openUrl(`https://duckduckgo.com/?q=${this.escapedSearchTerm()}&t=h_`)
  }

  searchOnGithub () {
    this.openUrl(`https://github.com/search?q=${this.escapedSearchTerm()}`)
  }

  searchOnStackOverflow () {
    this.openUrl(`https://stackoverflow.com/search?q=${this.escapedSearchTerm()}`)
  }

  private escapedSearchTerm() {
    return encodeURIComponent(this.selectedError.message)
  }

  private openUrl(url) {
    window.open(url, '_blank');
  }
}
