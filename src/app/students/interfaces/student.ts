import { ICourse } from '../../courses/interfaces/course';

export interface IStudent {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  courses?: ICourse[] | undefined;
}
