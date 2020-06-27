import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CSSPropsDirective} from "./css-props.directive";


@NgModule({
  declarations: [CSSPropsDirective],
  exports: [
    CSSPropsDirective
  ],
  imports: [
    CommonModule
  ]
})
export class CssPropsModule { }
