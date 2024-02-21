import { ActionReducerMap } from '@ngrx/store';
/* Interfaces */
import { IAuthState } from '../../auth/interfaces/auth.state.interface';
/* Reducers */
import { authReducer } from '../../auth/state/reducers/auth.reducer';
export interface AppState {
  identity: IAuthState;
}
export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  identity: authReducer,
};
