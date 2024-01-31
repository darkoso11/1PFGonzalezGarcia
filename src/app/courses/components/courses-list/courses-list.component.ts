import { Component, EventEmitter, OnInit, Output } from '@angular/core';
/* RxJs */
import { Subject } from 'rxjs';
/* interfaces */
import { ICourse } from '../../interfaces/course';
import { IStudent } from '../../../students/interfaces/student';
/* Services */
import { CoursesService } from '../../services/courses.service';
import { StudentsService } from '../../../students/services/students.service';
@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
})
export class CoursesListComponent implements OnInit {
  @Output() editActive: EventEmitter<boolean> = new EventEmitter();
  @Output() editCourse: EventEmitter<number> = new EventEmitter();
  public courses: ICourse[] = [];
  displayedColumns: string[] = ['id', 'name', 'profesor', 'actions'];
  dataSource$: Subject<ICourse[]> = new Subject<ICourse[]>();
  public showCourseForm: boolean = false;
  public course: ICourse | undefined;
  public formMessage: string | undefined;
  constructor(private _coursesService: CoursesService) {}

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this._coursesService.getCourses().subscribe({
      next: (cs: ICourse[]) => {
        this.courses = cs;
        this.dataSource$.next(cs);
      },
      error: (err) => console.error(err),
    });
  }

  editCourseChanger(id: number) {
    this.editActive.emit(true);
    this.editCourse.emit(id);
  }

  showCourse(id: number | undefined = undefined) {
    console.log(id);
    if (id !== undefined) {
      this.showCourseForm = true;
      this.course = this.courses.find((cs) => cs.id === id);
    } else {
      this.showCourseForm = false;
      this.course = undefined;
    }
  }

  async saveChanges(course: ICourse) {
    try {
      let updateCourse = this._coursesService.updateCourse(course);
      if (!updateCourse) throw new Error('No se pudo actualizar el curso');
      this.getCourses();
      this.formMessage = 'Cambios guardados';
      this.showCourse();
    } catch (error) {
      console.error(error);
      this.formMessage = 'No se pudo guardar los cambios';
    }
  }
  deleteCourse(id: number) {
    let deleteCourse = this._coursesService.deleteCourse(id);
  }
}
