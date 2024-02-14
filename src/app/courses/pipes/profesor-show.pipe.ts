import { Pipe, PipeTransform } from '@angular/core';
/* Interfaces */
import { IStudent } from '../../students/interfaces/student';
/* Services */
import { StudentsService } from '../../students/services/students.service';

@Pipe({
  name: 'profesorShow',
})
export class ProfesorShowPipe implements PipeTransform {
  public students: IStudent[] = [];
  public firstTime: boolean = true;
  constructor(private _studentsService: StudentsService) {
    this._studentsService.rechargeStudents();
    this._studentsService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
      },
      error: (err) => console.error(err),
    });
  }
  async transform(
    profesor: IStudent | number,
    ...args: unknown[]
  ): Promise<string> {
    if (!!this.firstTime) {
      this.firstTime = false;
      this._studentsService.rechargeStudents();
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('hola');
        }, 500);
      });
    }
    switch (typeof profesor) {
      case 'number':
        profesor =
          this.students.find((st) => {
            return st.id === profesor;
          }) || profesor;
        if (typeof profesor === 'number') {
          return `Profesor con id: ${profesor}`;
        } else {
          return `${profesor.firstName} ${profesor.lastName}`;
        }
      case 'object':
        return `${profesor.firstName} ${profesor.lastName}`;
      default:
        return '';
    }
  }
}
