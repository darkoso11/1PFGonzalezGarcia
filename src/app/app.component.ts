import { Component, OnInit } from '@angular/core';
/* RxJs */
import { Subject } from 'rxjs';
/* Interfaces */
import { IStudent } from './students/interfaces/student';
/* Services */
import { AuthService } from './auth/services/auth.service';
/* Store */
import { Store } from '@ngrx/store';
import { AppState } from './core/state/app.state';
import { AuthActions } from './auth/state/actions/auth.actions';
import { identitySelector } from './auth/state/selectors/auth.selectors';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public identity: IStudent | undefined;
  constructor(
    private _authService: AuthService,
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
}
