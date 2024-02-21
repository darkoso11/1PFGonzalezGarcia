import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/* Modules */
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './core/components/home/home.component';
/* Components */
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
/* Store */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ROOT_REDUCERS } from './core/state/app.state';
import { AuthEffects } from './auth/state/effects/auth.effects';

@NgModule({
  declarations: [
    //componentes
    AppComponent,
    NavbarComponent,
    HomeComponent,
  ],
  imports: [
    // módulos
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    /* Store */
    StoreModule.forRoot(ROOT_REDUCERS),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      name: 'OSOAPP',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
