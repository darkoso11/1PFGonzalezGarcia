import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/* Interfaces */
import { ICourse } from '../../interfaces/course';
import { IStudent } from '../../../students/interfaces/student';
/* Services */
import { CoursesService } from '../../services/courses.service';
import { StudentsService } from '../../../students/services/students.service';
@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrl: './courses-form.component.scss',
})
export class CoursesFormComponent implements OnInit, OnChanges {
  @Input() editActive: boolean = false;
  @Input() editCourse: number | undefined;
  @Output() editActiveChangedTo: EventEmitter<boolean> = new EventEmitter();
  @Output() recoverCourse: EventEmitter<ICourse> = new EventEmitter();
  @Input() manageCourseFromOutside: boolean = false;
  public id: number = 0;
  public students: IStudent[] = [];
  public profesors: IStudent[] = [];
  courseForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _coursesService: CoursesService,
    private _studentsService: StudentsService
  ) {
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      profesor: [undefined, Validators.required],
      students: [[]],
    });
  }
  ngOnInit(): void {
    this.getId();
    this.getTeachers();
    this.getStudents();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.editActive == true &&
      !!this.editCourse &&
      this.editCourse != undefined &&
      this.editCourse != this.id
    ) {
      this.id = this.editCourse;
      let course = this._coursesService.getCourse(this.editCourse);
      if (course) {
        this.courseForm.patchValue(course);
      }
    }
  }
  getId() {
    this._coursesService.getCourses().subscribe({
      next: (courses: ICourse[]) => {
        this.id = !this.editActive ? courses.length + 1 : this.id;
      },
      error: (err: any) => console.error(err),
    });
  }
  getTeachers() {
    this._studentsService.getStudents().subscribe({
      next: (students: IStudent[]) => {
        this.profesors = students.filter((student) => {
          return ['PROFESOR', 'ADMIN'].includes(student.role);
        });
      },
      error: (err: any) => console.error(err),
    });
  }

  getStudents(): void {
    this._studentsService.getStudents().subscribe({
      next: (students) => {
        this.students = students.filter((student) => {
          return ['STUDENT', 'PROFESOR', 'ADMIN'].includes(student.role);
        });
      },
      error: (err) => console.error(err),
    });
  }
  onSubmit() {
    if (this.courseForm.valid) {
      let course: ICourse = {
        id: this.id,
        name: this.courseForm.value.name,
        profesor: this.courseForm.value.profesor,
        students: this.courseForm.value.students,
      };
      if (!!this.editActive) {
        if (!!this.manageCourseFromOutside) {
          this.recoverCourse.emit(course);
        }
        {
          this._coursesService.updateCourse(course);
          this.editActive = false;
          this.editCourse = undefined;
          this.editActiveChangedTo.emit(this.editActive);
        }
      } else {
        this._coursesService.createCourse(this.courseForm.value);
        this.getId();
      }
      this.courseForm.reset();
    } else {
      this.courseForm.markAllAsTouched();
    }
  }
  addStudent(student: IStudent) {
    let students = this.courseForm.value.students;
    if (!students.includes(student.id)) {
      students.push(student.id);
      this.courseForm.patchValue({ students: students });
    }
  }
  removeStudent(student: IStudent) {
    let students = this.courseForm.value.students;
    if (students.includes(student.id)) {
      students.splice(students.indexOf(student.id), 1);
      this.courseForm.patchValue({ students: students });
    }
  }
}
