import { Component, EventEmitter, OnInit, Output } from '@angular/core';
/* RxJs */
import { Subject } from 'rxjs';
/* interfaces */
import { ICourse } from '../../interfaces/course';
import { IStudent } from '../../../students/interfaces/student';
/* Services */
import { CoursesService } from '../../services/courses.service';
import { AuthService } from '../../../auth/services/auth.service';
/* Store */
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/state/app.state';
import { AuthActions } from '../../../auth/state/actions/auth.actions';
import { identitySelector } from '../../../auth/state/selectors/auth.selectors';
@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
})
export class CoursesListComponent implements OnInit {
  public identity: IStudent | undefined;
  @Output() editActive: EventEmitter<boolean> = new EventEmitter();
  @Output() editCourse: EventEmitter<number> = new EventEmitter();
  public courses: ICourse[] = [];
  displayedColumns: string[] = ['id', 'name', 'profesor', 'actions'];
  dataSource$: Subject<ICourse[]> = new Subject<ICourse[]>();
  public showCourseForm: boolean = false;
  public course: ICourse | undefined;
  public formMessage: string | undefined;
  constructor(
    private _authService: AuthService,
    private _coursesService: CoursesService,
    private _store: Store<AppState>
  ) {
    this._store.select(identitySelector).subscribe({
      next: (student) => {
        this.identity = student;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ngOnInit(): void {
    this._store.dispatch(AuthActions.loadIdentity());
    this.getCourses();
    this._authService.getIdentity();
    this._coursesService.getCourses().subscribe({
      next: (courses: ICourse[]) => {
        this.courses = courses;
        this.dataSource$.next(courses);
      },
      error: (err: any) => console.error(err),
    });
  }

  getCourses(): void {
    this._coursesService.courses$.subscribe({
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
    this._coursesService.deleteCourse(id).subscribe({
      next: (cs: ICourse | undefined) => {
        this._coursesService.rechargeCourse();
        this.formMessage = 'Curso eliminado';
      },
      error: (err) => {
        console.error(err);
        this.formMessage = 'No se pudo eliminar el curso';
      },
    });
  }
}
