import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
/* Services */
import { AuthService } from '../../services/auth.service';
/* Store */
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/state/app.state';
import { AuthActions } from '../../state/actions/auth.actions';

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
    private _router: Router,
    private _store: Store<AppState>
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
            this._store.dispatch(
              AuthActions.loadIdentitySuccess({
                identityState: {
                  loaded: true,
                  identity: student,
                },
              })
            );
            alert('Welcome ' + student.firstName);
            this._router.navigate(['/']);
          } else {
            alert('Invalid email or password');
          }
        });
    }
  }
}
