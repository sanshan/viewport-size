import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IfViewportSizeDirective} from './if-viewport-size.directive';
import {ViewportService} from "./viewport.service";
import {IConfig} from "./model";
import {ViewportConfigService} from './viewport-config';


@NgModule({
  declarations: [IfViewportSizeDirective],
  exports: [
    IfViewportSizeDirective
  ],
  imports: [
    CommonModule
  ]
})
export class IfViewportSizeModule {

  static forRoot(config: IConfig): ModuleWithProviders<IfViewportSizeModule> {
    return {
      ngModule: IfViewportSizeModule,
      providers: [
        ViewportService,
        {
          provide: ViewportConfigService,
          useValue: config
        },
        {provide: Window, useValue: window}
      ]
    }
  }

}
