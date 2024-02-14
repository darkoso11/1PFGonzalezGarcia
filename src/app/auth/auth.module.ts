import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
/* Modules */
import { SharedModule } from '../shared/shared.module';
/* Components */
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StudentsModule } from '../students/students.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule, StudentsModule],
  exports: [LoginComponent, RegisterComponent],
})
export class AuthModule {}
