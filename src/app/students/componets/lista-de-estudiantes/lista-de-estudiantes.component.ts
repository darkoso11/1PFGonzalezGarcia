import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IStudent } from '../../interfaces/student';
import { StudentsService } from '../../services/students.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-lista-de-estudiantes',
  templateUrl: './lista-de-estudiantes.component.html',
  styleUrl: './lista-de-estudiantes.component.scss',
})
export class ListaDeEstudiantesComponent implements OnInit {
  @Output() editActive: EventEmitter<boolean> = new EventEmitter();
  @Output() editStudent: EventEmitter<number> = new EventEmitter();
  displayedColumns: string[] = ['id', 'fullName', 'email', 'role', 'actions'];
  dataSource$: Subject<IStudent[]> = new Subject<IStudent[]>();
  constructor(private _studentsService: StudentsService) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this._studentsService.getStudents().subscribe({
      next: (st: IStudent[]) => {
        console.log(st);
        this.dataSource$.next(st);
      },
      error: (err) => console.error(err),
    });
  }

  editStudentChanger(id: number) {
    this.editActive.emit(true);
    this.editStudent.emit(id);
  }

  deleteStudent(id: number) {
    this._studentsService.deleteStudent(id);
  }
}
