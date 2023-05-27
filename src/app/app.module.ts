import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DoggoDisplayComponent } from './doggo-display/doggo-display.component';

@NgModule({
  declarations: [
    AppComponent,
    DoggoDisplayComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
