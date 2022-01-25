import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// import { MazuButtonComponentModule } from '@/ui/button';
import { environment } from '@/app/environment';
import { reducers, effects, devToolsConfig } from './core/store';
import { JwtInterceptorService } from './core/interceptors';
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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true,
    },
  ],
})
export class AppModule {}
