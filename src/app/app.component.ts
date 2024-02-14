import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
/* RxJs */
import { Subject } from 'rxjs';
/* Interfaces */
import { IStudent } from './students/interfaces/student';
/* Services */
import { AuthService } from './auth/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public identity$: Subject<IStudent | null>;
  public identity: IStudent | null = null;
  constructor(private _authService: AuthService, private _router: Router) {
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
