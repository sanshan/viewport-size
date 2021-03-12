import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {TestComponent} from './test.component';
import {IfViewportSizeModule} from "./if-viewport-size/if-viewport-size.module";
import {environment} from "../environments/environment";


@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    IfViewportSizeModule.forRoot(environment.viewPortConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
