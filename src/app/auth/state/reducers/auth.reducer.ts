import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions/auth.actions';
import { IAuthState } from '../../interfaces/auth.state.interface';

export const authFeatureKey = 'auth';

export const initialState: IAuthState = {
  loaded: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loadIdentity, (state) => {
    return { ...state, loaded: false };
  }),
  on(AuthActions.loadIdentitySuccess, (state, { identityState }) => {
    localStorage.setItem(
      'OSOAPP_student',
      JSON.stringify(identityState.identity)
    );
    return {
      ...state,
      loaded: true,
      identity: identityState.identity,
      token: identityState.token,
    };
  }),
  on(AuthActions.loadIdentityFailure, (state, error: unknown) => {
    console.error(error);
    localStorage.removeItem('OSOAPP_student');
    return { ...state, loaded: false };
  })
);
