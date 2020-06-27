import {ChangeDetectorRef, Directive, ElementRef, Input, NgZone, OnChanges, SimpleChanges} from '@angular/core';

/*
 * Workaround for setting CSS custom properties:
 * https://github.com/angular/angular/issues/9343
 *
 * Cannot work for any style properties.
 */
@Directive({
  selector: '[cssProps]',
})
export class CSSPropsDirective implements OnChanges {

  @Input() cssProps: any;

  constructor(private element: ElementRef<HTMLElement>,
              private cd: ChangeDetectorRef,
              private zone: NgZone) {
    (window as any).myElement = element.nativeElement;
  }

  ngOnChanges({cssProps}: SimpleChanges) {
    if (cssProps && cssProps.currentValue) {
      const {style} = this.element.nativeElement;
      this.zone.runOutsideAngular(() => {
        for (const [k, v] of Object.entries(cssProps.currentValue)) {
          console.info({k, v}, cssProps.currentValue);
          style.setProperty(k, v.toString(), "important");

        }
      })

    }
  }
}
