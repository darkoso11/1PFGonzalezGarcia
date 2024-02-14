import { Injectable } from '@angular/core';
import { IStudent } from '../interfaces/student';
import { Observable, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  public students: IStudent[] = [
    {
      id: 0,
      firstName: 'Madara',
      lastName: 'Uchiha',
      email: 'madara@uchiha.com',
      password: 'whatAboutTheSecond?',
      role: 'ADMIN',
    },
    {
      id: 1,
      firstName: 'Naruto',
      lastName: 'Usumaki',
      email: 'narutohokague@konoha.com',
      password: 'iamthehokague1',
      role: 'STUDENT',
    },
    {
      id: 2,
      firstName: 'Midoriya',
      lastName: 'Izuku',
      email: 'allmaight1@UA.com',
      password: 'allmaigththebest1',
      role: 'USER',
    },
    {
      id: 3,
      firstName: 'Sasuke',
      lastName: 'Uchiha',
      email: 'sasuke@uchiha.com',
      password: 'iamthebest1',
      role: 'STUDENT',
    },
    {
      id: 4,
      firstName: 'Kakashi',
      lastName: 'Hatake',
      email: 'kakashi@hatake.com',
      password: 'iamthebest2',
      role: 'PROFESOR',
    },
  ];
  public students$: Subject<IStudent[]> = new Subject();
  constructor(private _http: HttpClient) {
    this.students$.next(this.students);
  }
  /* Create */
  createStudent(student: IStudent): Observable<IStudent | undefined> {
    return this._http
      .post<IStudent>(
        'https://630809c246372013f5757c8c.mockapi.io/Student',
        student
      )
      .pipe(
        map((student: IStudent) => {
          if (!!student && !!student.id) {
            student.id =
              typeof student.id === 'number'
                ? student.id
                : parseInt(student.id);
            this.students.push(student);
            this.students$.next(this.students);
            return student;
          } else {
            return undefined;
          }
        })
      );
  }
  /* Read */
  getStudent(id: number): Observable<IStudent | undefined> {
    return this._http
      .get<IStudent>(
        `https://630809c246372013f5757c8c.mockapi.io/Student/${id}`
      )
      .pipe(
        map((student: IStudent) => {
          if (!!student && !!student.id) {
            student.id =
              typeof student.id === 'number'
                ? student.id
                : parseInt(student.id);
            return student;
          } else {
            return undefined;
          }
        })
      );
  }
  getStudents(): Observable<IStudent[]> {
    return this._http
      .get<IStudent[]>('https://630809c246372013f5757c8c.mockapi.io/Student')
      .pipe(
        map((students: IStudent[]) => {
          students = students.map((student) => {
            student.id =
              typeof student.id === 'number'
                ? student.id
                : parseInt(student.id);
            return student;
          });
          this.students = students;
          this.students$.next(this.students);
          return students;
        })
      );
  }
  /* Update */
  updateStudent(student: IStudent): Observable<IStudent | undefined> {
    return this._http
      .put<IStudent>(
        `https://630809c246372013f5757c8c.mockapi.io/Student/${student.id}`,
        student
      )
      .pipe(
        map((student: IStudent) => {
          if (!!student && !!student.id) {
            student.id =
              typeof student.id === 'number'
                ? student.id
                : parseInt(student.id);
            this.students = this.students.map((st) => {
              if (st.id === student.id) {
                return student;
              } else {
                return st;
              }
            });
            this.students$.next(this.students);
            return student;
          } else {
            return undefined;
          }
        })
      );
  }
  /* Delete  */
  deleteStudent(id: number): Observable<IStudent | undefined> {
    return this._http
      .delete<IStudent>(
        `https://630809c246372013f5757c8c.mockapi.io/Student/${id}`
      )
      .pipe(
        map((student: IStudent) => {
          if (!!student && !!student.id) {
            student.id =
              typeof student.id === 'number'
                ? student.id
                : parseInt(student.id);
            this.students = this.students.filter((st) => st.id !== student.id);
            this.students$.next(this.students);
            return student;
          } else {
            return undefined;
          }
        })
      );
  }
  /* Charge */
  rechargeStudents() {
    this.students$.next(this.students);
    /* this.getStudents().subscribe({
      next: (st: IStudent[]) => {
        this.students = st;
      },
      error: (err) => console.error(err),
    }); */
  }
}
