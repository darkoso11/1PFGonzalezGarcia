import { Component, EventEmitter, OnInit, Output } from '@angular/core';
/* RxJs */
import { Subject } from 'rxjs';
/* Interfaces */
import { IStudent } from '../../interfaces/student';
/* Services */
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-lista-de-estudiantes',
  templateUrl: './lista-de-estudiantes.component.html',
  styleUrl: './lista-de-estudiantes.component.scss',
})
export class ListaDeEstudiantesComponent implements OnInit {
  @Output() editActive: EventEmitter<boolean> = new EventEmitter();
  @Output() editStudent: EventEmitter<number> = new EventEmitter();
  public students: IStudent[] = [];
  displayedColumns: string[] = ['id', 'fullName', 'email', 'role', 'actions'];
  dataSource$: Subject<IStudent[]> = new Subject<IStudent[]>();
  public showStudentForm: boolean = false;
  public student: IStudent | undefined;
  public formMessage: string | undefined;
  constructor(private _studentsService: StudentsService) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this._studentsService.getStudents().subscribe({
      next: (st: IStudent[]) => {
        this.students = st;
        this.dataSource$.next(st);
      },
      error: (err) => console.error(err),
    });
  }

  editStudentChanger(id: number) {
    this.editActive.emit(true);
    this.editStudent.emit(id);
  }

  showStudent(id: number | undefined = undefined) {
    if (!!id) {
      this.showStudentForm = true;
      this.student = this.students.find((st) => st.id === id);
    } else {
      this.showStudentForm = false;
      this.student = undefined;
    }
  }
  async saveChanges(student: IStudent) {
    try {
      let updateStudent = this._studentsService.updateStudent(student);
      if (!updateStudent)
        throw new Error('No se pudo actualizar el estudiante');
      this.formMessage = 'Cambios guardados';
      this.showStudent();
    } catch (error: any) {
      this.formMessage = error.message;
      console.error(error);
    }
  }

  deleteStudent(id: number) {
    this._studentsService.deleteStudent(id);
  }
}
