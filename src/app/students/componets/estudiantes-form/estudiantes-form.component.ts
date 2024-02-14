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
import { IStudent } from '../../interfaces/student';
import { IRole } from '../../interfaces/roles';
/* Services */
import { StudentsService } from '../../services/students.service';
import { CoursesService } from '../../../courses/services/courses.service';
import { ICourse } from '../../../courses/interfaces/course';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-estudiantes-form',
  templateUrl: './estudiantes-form.component.html',
  styleUrl: './estudiantes-form.component.scss',
})
export class EstudiantesFormComponent implements OnInit, OnChanges {
  @Input() editActive: boolean = false;
  @Input() editStudent: number | undefined;
  @Output() editActiveChangedTo: EventEmitter<boolean> = new EventEmitter();
  @Output() recoverStudent: EventEmitter<IStudent> = new EventEmitter();
  @Input() manageStudentFromOutside: boolean = false;
  public id: number = 0;
  public roles: IRole[] = [
    {
      name: 'Administrator',
      code: 'ADMIN',
    },
    {
      name: 'User',
      code: 'USER',
    },
    {
      name: 'Student',
      code: 'STUDENT',
    },
    {
      name: 'Profesor',
      code: 'PROFESOR',
    },
  ];
  public courses: ICourse[] = [];
  public coursesURIn: number[] = [];
  userForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _studentsService: StudentsService,
    private _coursesService: CoursesService
  ) {
    this.userForm = this.fb.group({
      lastName: this.fb.control('', Validators.required),
      firstName: this.fb.control('', Validators.required),
      /* career: this.fb.control('', Validators.required),
      address: this.fb.control('', Validators.required), */
      password: this.fb.control('', Validators.required),
      email: this.fb.control('', Validators.required),
      role: this.fb.control('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.getId();
    this.getCourses();
  }
  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes) {
      if (
        this.editActive === true &&
        !!this.editStudent &&
        this.editStudent !== this.id
      ) {
        this.id = this.editStudent;
        let student = await firstValueFrom(
          this._studentsService.getStudent(this.id)
        );
        if (student) {
          this.userForm = this.fb.group({
            lastName: this.fb.control(student.lastName, Validators.required),
            firstName: this.fb.control(student.firstName, Validators.required),
            /* career: this.fb.control('', Validators.required),
            address: this.fb.control('', Validators.required), */
            password: this.fb.control(student.password, Validators.required),
            email: this.fb.control(student.email, Validators.required),
            role: this.fb.control(student.role, Validators.required),
          });
          this.getCourses();
        }
      }
    }
  }
  getId(): void {
    this._studentsService.getStudents().subscribe({
      next: (st: IStudent[]) => {
        this.id = !this.editActive ? st.length + 1 : this.id;
      },
      error: (err: any) => console.error(err),
    });
  }
  getCourses(): void {
    this._coursesService.courses$.subscribe({
      next: (courses: ICourse[]) => {
        this.courses = courses;
        this.getCoursesURIn();
      },
      error: (err: any) => console.error(err),
    });
  }
  getCoursesURIn(): void {
    this.coursesURIn = this.courses
      .filter((course: ICourse) => {
        return course.students?.find((student: IStudent | number) =>
          typeof student !== 'number'
            ? student.id === this.id
            : student === this.id
        );
      })
      .map((course) => course.id);
  }
  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      let student: IStudent = {
        id: this.id,
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        role: this.userForm.value.role,
      };
      if (!!this.editActive) {
        if (!this.manageStudentFromOutside) {
          console.log(student);
          this._studentsService.updateStudent(student).subscribe({
            next: (st: IStudent | undefined) => {
              console.log(st);
              if (!!st && !!st.id) {
                alert('Student created');
                setTimeout(() => {
                  this._studentsService.rechargeStudents();
                }, 500);
              }
            },
            error: (err: any) => console.error(err),
          });
          this.editActive = false;
          this.editStudent = undefined;
          this.editActiveChangedTo.emit(this.editActive);
        } else {
          this.recoverStudent.emit(student);
        }
      } else {
        this._studentsService.createStudent(student).subscribe({
          next: (st: IStudent | undefined) => {
            console.log(st);
            if (!!st && !!st.id) {
              alert('Student created');
              setTimeout(() => {
                this._studentsService.rechargeStudents();
              }, 500);
            }
          },
          error: (err: any) => console.error(err),
        });
        this.getId();
      }
      this.userForm.reset();
    }
  }
  removeCourse(course: ICourse): void {
    this.coursesURIn.filter((id) => id !== course.id);
    course.students = course.students.filter((student: IStudent | number) =>
      typeof student !== 'number' ? student.id !== this.id : student !== this.id
    );
    this._coursesService.updateCourse(course);
    this.getCourses();
  }
  addCourse(course: ICourse): void {
    course.students.push(this.id);
    this.coursesURIn.push(course.id);
    this._coursesService.updateCourse(course);
    this.getCourses();
  }
}
