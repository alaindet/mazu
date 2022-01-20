import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from 'projects/mazu-app/src/environments/environment';
import { reducers, effects, devToolsConfig } from './core/store';
// import { MazuButtonComponentModule } from '@/ui/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // MazuButtonComponentModule,

    // Store
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    !environment.production
      ? StoreDevtoolsModule.instrument(devToolsConfig)
      : [],
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
