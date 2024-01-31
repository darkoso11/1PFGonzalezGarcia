import { IStudent } from '../../students/interfaces/student';

export interface ICourse {
  id: number;
  name: string;
  profesor: IStudent | number;
  students: IStudent[] | number[] | (IStudent | number | any)[];
}
