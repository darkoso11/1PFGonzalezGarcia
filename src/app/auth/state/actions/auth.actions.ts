import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IAuthState } from '../../interfaces/auth.state.interface';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Load Identity': emptyProps(),
    'Load Identity Success': props<{ identityState: IAuthState }>(),
    'Load Identity Failure': props<{ error: unknown }>(),
  },
});
