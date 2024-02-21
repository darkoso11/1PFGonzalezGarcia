import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
/* RxJs */
import { Subject } from 'rxjs';
/* Interfaces */
import { IStudent } from '../../../students/interfaces/student';
/* Services */
import { AuthService } from '../../../auth/services/auth.service';
/* Store */
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { AuthActions } from '../../../auth/state/actions/auth.actions';
import { identitySelector } from '../../../auth/state/selectors/auth.selectors';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  public identity: IStudent | undefined;
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _store: Store<AppState>
  ) {
    this._store.select(identitySelector).subscribe({
      next: (student) => {
        this.identity = student;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ngOnInit(): void {
    this._store.dispatch(AuthActions.loadIdentity());
    this._authService.getIdentity();
  }

  logout() {
    this._store.dispatch(
      AuthActions.loadIdentityFailure({ error: 'User logged out' })
    );
    this._router.navigate(['/auth/login']);
  }
}
