import { Injectable } from '@angular/core';
import { ICourse } from '../interfaces/course';
import { Observable, Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  public courses: ICourse[] = [
    {
      id: 1,
      name: 'Angular',
      profesor: 4,
      students: [1, 3],
    },
    {
      id: 2,
      name: 'NodeJs',
      profesor: 4,
      students: [1],
    },
    {
      id: 3,
      name: 'MongoDB',
      profesor: 4,
      students: [3],
    },
    {
      id: 4,
      name: 'Express',
      profesor: 4,
      students: [1],
    },
  ];
  public courses$: Subject<ICourse[]> = new Subject();
  constructor(private _http: HttpClient) {
    this.courses$.next(this.courses);
  }
  /* Create */
  createCourse(course: ICourse): Observable<ICourse | undefined> {
    return this._http
      .post<ICourse>(
        'https://630809c246372013f5757c8c.mockapi.io/course',
        course
      )
      .pipe(
        map((course: ICourse) => {
          if (!!course && !!course.id) {
            course.id =
              typeof course.id === 'number' ? course.id : parseInt(course.id);
            this.courses.push(course);
            this.courses$.next(this.courses);
            return course;
          } else {
            return undefined;
          }
        })
      );
  }
  /* Read */
  getCourse(id: number): Observable<ICourse | undefined> {
    return this._http
      .get<ICourse>(`https://630809c246372013f5757c8c.mockapi.io/course/${id}`)
      .pipe(
        map((course: ICourse) => {
          if (!!course && !!course.id) {
            course.id =
              typeof course.id === 'number' ? course.id : parseInt(course.id);
            return course;
          } else {
            return undefined;
          }
        })
      );
  }
  getCourses(): Observable<ICourse[]> {
    return this._http
      .get<ICourse[]>('https://630809c246372013f5757c8c.mockapi.io/course')
      .pipe(
        map((courses: ICourse[]) => {
          courses = courses.map((course) => {
            course.id =
              typeof course.id === 'number' ? course.id : parseInt(course.id);
            return course;
          });
          this.courses = courses;
          this.courses$.next(this.courses);
          return courses;
        })
      );
  }
  /* Update */
  updateCourse(course: ICourse): Observable<ICourse | undefined> {
    return this._http
      .put<ICourse>(
        `https://630809c246372013f5757c8c.mockapi.io/course/${course.id}`,
        course
      )
      .pipe(
        map((course: ICourse) => {
          if (!!course && !!course.id) {
            course.id =
              typeof course.id === 'number' ? course.id : parseInt(course.id);
            this.courses = this.courses.map((cs) => {
              if (cs.id === course.id) {
                return course;
              } else {
                return cs;
              }
            });
            this.courses$.next(this.courses);
            return course;
          } else {
            return undefined;
          }
        })
      );
  }
  /* Delete */
  deleteCourse(id: number): Observable<ICourse | undefined> {
    return this._http
      .delete<ICourse>(
        `https://630809c246372013f5757c8c.mockapi.io/course/${id}`
      )
      .pipe(
        map((course: ICourse) => {
          if (!!course && !!course.id) {
            course.id =
              typeof course.id === 'number' ? course.id : parseInt(course.id);
            this.courses = this.courses.filter((cs) => cs.id !== course.id);
            this.courses$.next(this.courses);
            return course;
          } else {
            return undefined;
          }
        })
      );
  }
  /* Charge */
  rechargeCourse(): void {
    this.courses$.next(this.courses); /*
    this.getCourses().subscribe({
      next: (cs: ICourse[]) => {
        this.courses = cs;
      },
      error: (err) => console.error(err),
    }); */
  }
}
