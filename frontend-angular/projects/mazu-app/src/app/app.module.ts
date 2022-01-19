import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers, effects, devToolsConfig } from './core/store';
// import { MazuButtonComponentModule } from '@/ui/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // MazuButtonComponentModule,

    // Store
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    !environment.production ? StoreDevtoolsModule.instrument(devToolsConfig) : [],
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
