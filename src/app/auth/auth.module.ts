import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
/* Modules */
import { SharedModule } from '../shared/shared.module';
/* Components */
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StudentsModule } from '../students/students.module';
/* Store */
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/effects/auth.effects';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    StudentsModule,
    /* Store */
    EffectsModule.forFeature([AuthEffects]),
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    /* Store */
    EffectsModule,
  ],
})
export class AuthModule {}
