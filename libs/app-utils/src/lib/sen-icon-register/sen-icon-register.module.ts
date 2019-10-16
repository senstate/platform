import {Inject, InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";


export interface RegisterConfig {
  svgFolder: string;
  icons: string[];
}

export const CONFIG_INJECTOR_TOKEN = new InjectionToken<RegisterConfig>('CONFIG');


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SenIconRegisterModule {
  static register (config: RegisterConfig): ModuleWithProviders<SenIconRegisterModule> {
    return {
      ngModule: SenIconRegisterModule,
      providers: [
        {
          provide: CONFIG_INJECTOR_TOKEN,
          useValue: config
        }
      ]
    };
  }

  constructor (@Inject(CONFIG_INJECTOR_TOKEN) config: RegisterConfig,
               iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    for (const icon of config.icons) {
      iconRegistry.addSvgIcon(
        icon,
        sanitizer.bypassSecurityTrustResourceUrl(`${config.svgFolder}/${icon}.svg`));
    }

  }
}

