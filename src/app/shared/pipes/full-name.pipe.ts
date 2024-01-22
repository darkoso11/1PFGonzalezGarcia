import { Pipe, PipeTransform } from '@angular/core';
import { IStudent } from '../../students/interfaces/student';

@Pipe({
  name: 'fullName',
})
export class FullNamePipe implements PipeTransform {
  transform(student: IStudent, ...args: unknown[]): unknown {
    return student.firstName + ' ' + student.lastName;
  }
}
