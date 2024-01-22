import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//angular
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule } from '@angular/forms';

//componentes del layout
import { NavbarComponent } from './components/dashboard/navbar/navbar.component';
import { ListaDeEstudiantesComponent } from './components/dashboard/lista-de-estudiantes/lista-de-estudiantes/lista-de-estudiantes.component';
import { EstudiantesFormComponent } from './components/dashboard/datos-de-estudiates/estudiantes-form/estudiantes-form.component';




@NgModule({
  declarations: [
    NavbarComponent,
    ListaDeEstudiantesComponent,
    EstudiantesFormComponent,
  ],
  imports: [
    CommonModule,
    //angular
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  exports: [
    NavbarComponent,
  ]
})
export class LayoutModule { }
