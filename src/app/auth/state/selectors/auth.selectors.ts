import { createSelector } from '@ngrx/store';
import { IAuthState } from '../../interfaces/auth.state.interface';
import { AppState } from '../../../core/state/app.state';
import { IStudent } from '../../../students/interfaces/student';

export const selectAuthState = (state: AppState): IAuthState => state.identity;
export const identityLoadedSelector = createSelector(
  selectAuthState,
  (state: IAuthState): boolean => state.loaded
);
export const identitySelector = createSelector(
  selectAuthState,
  (state: IAuthState): IStudent | undefined => state.identity
);
export const tokenSelector = createSelector(
  selectAuthState,
  (state: IAuthState): string | undefined => state.token
);
