import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IStudent } from '../../students/interfaces/student';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public identity$: Subject<IStudent | null> = new Subject();
  public identity: IStudent | null = this.getIdentity();
  constructor(private _http: HttpClient) {}

  login(email: string, password: string): Observable<IStudent | undefined> {
    return this._http
      .get<IStudent[]>('https://630809c246372013f5757c8c.mockapi.io/Student')
      .pipe(
        map((s: IStudent[]) => {
          return s.find(
            (student) =>
              student.email === email && student.password === password
          );
        })
      );
  }
  saveIdentity(student: IStudent): void {
    localStorage.setItem('OSOAPP_student', JSON.stringify(student));
    this.identity = student;
    this.identity$.next(student);
  }
  getIdentity(): IStudent | null {
    const student = localStorage.getItem('OSOAPP_student');
    this.identity = student ? JSON.parse(student) : null;
    this.identity$.next(this.identity);
    return this.identity;
  }
  removeIdentity(): void {
    localStorage.removeItem('OSOAPP_student');
    this.identity = null;
    this.identity$.next(this.identity);
  }
}
