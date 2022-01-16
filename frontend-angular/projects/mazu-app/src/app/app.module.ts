import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MazuButtonComponentModule } from '@/ui/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MazuButtonComponentModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
