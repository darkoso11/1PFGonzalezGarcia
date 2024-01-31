import { Injectable } from '@angular/core';
import { IStudent } from '../interfaces/student';
import { Observable, Subject } from 'rxjs';

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
  constructor() {
    this.students$.next(this.students);
  }
  /* Create */
  createStudent(student: IStudent) {
    this.students.push(student);
    this.students$.next(this.students);
    return this.students.find((st) => st.id === student.id);
  }
  /* Read */
  getStudent(id: number): IStudent | undefined {
    this.students$.next(this.students);
    return this.students.find((st) => st.id === id);
  }
  getStudents(): Observable<IStudent[]> {
    setTimeout(() => {
      this.students$.next(this.students);
    }, 10);
    return this.students$.asObservable();
  }
  /* Update */
  updateStudent(student: IStudent) {
    this.students = this.students.map((st) => {
      if (st.id === student.id) {
        console.log(st);
        st = student;
      }
      return st;
    });
    this.students$.next(this.students);
    console.log(this.students);
    return this.students.find((st) => st.id === student.id);
  }
  /* Delete  */
  deleteStudent(id: number) {
    let st = this.students.find((st) => st.id === id);
    this.students = this.students.filter((st) => st.id !== id);
    this.students$.next(this.students);
    return st;
  }
  /* Charge */
  rechargeStudents() {
    this.students$.next(this.students);
  }
}
