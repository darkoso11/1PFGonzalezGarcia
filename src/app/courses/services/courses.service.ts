import { Injectable } from '@angular/core';
import { ICourse } from '../interfaces/course';
import { Observable, Subject } from 'rxjs';

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
  constructor() {
    this.courses$.next(this.courses);
  }
  /* Create */
  createCourse(course: ICourse) {
    this.courses.push(course);
    this.courses$.next(this.courses);
    return this.courses.find((cr) => cr.id === course.id);
  }
  /* Read */
  getCourse(id: number) {
    this.courses$.next(this.courses);
    return this.courses.find((cr) => cr.id === id);
  }
  getCourses(): Observable<ICourse[]> {
    setTimeout(() => {
      this.courses$.next(this.courses);
    }, 10);
    return this.courses$;
  }
  /* Update */
  updateCourse(course: ICourse) {
    const index = this.courses.findIndex((cr) => cr.id === course.id);
    this.courses[index] = course;
    this.courses$.next(this.courses);
    return this.courses.find((cr) => cr.id === course.id);
  }
  /* Delete */
  deleteCourse(id: number) {
    this.courses = this.courses.filter((cr) => cr.id !== id);
    this.courses$.next(this.courses);
    return this.courses;
  }
}
