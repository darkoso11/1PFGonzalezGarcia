import { Component, OnInit } from '@angular/core';
/* Rxjs */
import { Subject } from 'rxjs';
/* Interfaces */
import { IStudent } from '../../../students/interfaces/student';
import { AuthService } from '../../../auth/services/auth.service';
/* Services */
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  public identity$: Subject<IStudent | null>;
  public identity: IStudent | null = null;
  public editActive: boolean = false;
  public editCourse: number | undefined;
  constructor(private _authService: AuthService) {
    this.identity$ = this._authService.identity$;
    this.identity$.subscribe({
      next: (student) => {
        this.identity = student;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ngOnInit(): void {
    this._authService.getIdentity();
  }
}
