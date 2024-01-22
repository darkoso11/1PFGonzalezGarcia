import { Component } from '@angular/core';
import { User } from './models';


@Component({
  selector: 'app-lista-de-estudiantes',
  templateUrl: './lista-de-estudiantes.component.html',
  styleUrl: './lista-de-estudiantes.component.scss'
})
export class ListaDeEstudiantesComponent {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'role',];
  dataSource: User[] = [
    {
      id: 1,
      firstName: 'Naruto',
      lastName: 'Usumaki',
      email: 'narutohokague@konoha.com',
      password: 'iamthehokague1',
      role: 'ADMIN',
    },
    {
      id: 2,
      firstName: 'Midoriya',
      lastName: 'Izuku',
      email: 'allmaight1@UA.com',
      password: 'allmaigththebest1',
      role: 'USER',
    }
  ];
}
