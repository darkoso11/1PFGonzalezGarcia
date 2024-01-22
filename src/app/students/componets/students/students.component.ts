import { Component } from '@angular/core';

@Component({
  selector: 'students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent {
  public editActive: boolean = false;
  public editStudent: number | undefined;
}
