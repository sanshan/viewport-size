import {InjectionToken} from "@angular/core";
import {IConfig} from "./model";

export const ViewportConfigService = new InjectionToken<IConfig>('ViewportConfig');
