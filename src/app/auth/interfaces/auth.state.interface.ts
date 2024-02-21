import { IStudent } from '../../students/interfaces/student';

export interface IAuthState {
  loaded: boolean;
  identity?: IStudent | undefined;
  token?: string | undefined;
}
