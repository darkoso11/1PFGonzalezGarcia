import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { AuthActions } from '../actions/auth.actions';
import { IAuthState } from '../../interfaces/auth.state.interface';
import { IStudent } from '../../../students/interfaces/student';
import { StudentsService } from '../../../students/services/students.service';

@Injectable()
export class AuthEffects {
  loadIdentity$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loadIdentity),
      concatMap(() => {
        const localIdentity: string | null =
          localStorage.getItem('OSOAPP_student');
        let identity: IStudent | undefined = undefined;
        if (!!localIdentity) {
          identity = JSON.parse(localIdentity);
        }
        let identityObservable: Observable<IStudent | undefined> = !!identity
          ? this._studentsService.getStudent(identity.id)
          : of(undefined);
        return identityObservable.pipe(
          map((identity: IStudent | undefined) => {
            if (!!identity) {
              return AuthActions.loadIdentitySuccess({
                identityState: {
                  loaded: true,
                  identity: identity,
                },
              });
            } else {
              return AuthActions.loadIdentityFailure({
                error: 'No identity found',
              });
            }
          }),
          catchError((error: unknown) =>
            of(AuthActions.loadIdentityFailure({ error }))
          )
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private _studentsService: StudentsService
  ) {}
}
