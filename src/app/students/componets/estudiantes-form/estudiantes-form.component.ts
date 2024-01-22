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
import { StudentsService } from '../../services/students.service';
import { IStudent } from '../../interfaces/student';

@Component({
  selector: 'app-estudiantes-form',
  templateUrl: './estudiantes-form.component.html',
  styleUrl: './estudiantes-form.component.scss',
})
export class EstudiantesFormComponent implements OnInit, OnChanges {
  @Input() editActive: boolean = false;
  @Input() editStudent: number | undefined;
  @Output() editActiveChangedTo: EventEmitter<boolean> = new EventEmitter();
  public id: number = 0;
  userForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _studentsService: StudentsService
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
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (
        this.editActive === true &&
        !!this.editStudent &&
        this.editStudent !== this.id
      ) {
        this.id = this.editStudent;
        let student = this._studentsService.getStudent(this.id);
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
        console.log(student);
        this._studentsService.updateStudent(student);
        this.editActive = false;
        this.editStudent = undefined;
      } else {
        this._studentsService.createStudent(student);
      }
      this.userForm.reset();
    }
  }
}
