import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/* Components */
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
/* Modules */
import { SharedModule } from './shared/shared.module';
import { StudentsModule } from './students/students.module';

@NgModule({
  declarations: [
    //componentes
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    // módulos
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    StudentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
