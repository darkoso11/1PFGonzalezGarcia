import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
/* Services */
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.form = this.fb.group({
      email: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
    });
  }
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
    } else {
      this._authService
        .login(this.form.value.email, this.form.value.password)
        .subscribe((student) => {
          console.log(student);
          if (student) {
            this._authService.saveIdentity(student);
            alert('Welcome ' + student.firstName);
            this._router.navigate(['/']);
          } else {
            alert('Invalid email or password');
          }
        });
    }
  }
}
