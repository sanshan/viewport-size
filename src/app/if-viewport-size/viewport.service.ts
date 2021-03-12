import {Inject, Injectable} from '@angular/core';
import {IConfig} from "./model";
import {ViewportConfigService} from "./viewport-config";


@Injectable()
export class ViewportService {

  constructor(@Inject(ViewportConfigService) private config: IConfig) {
  }

  calculateState(viewportWidth: number, type: 'small' | 'medium' | 'large'): boolean {
    switch (type) {
      case "small":
        return viewportWidth < this.config.medium;
      case "medium":
        return viewportWidth >= this.config.medium && viewportWidth < this.config.large;
      case "large":
        return viewportWidth >= this.config.large;
    }
  }
}
