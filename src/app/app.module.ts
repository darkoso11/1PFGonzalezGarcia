import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/* Modules */
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './core/components/home/home.component';
/* Components */
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
