import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Modules */
import { SharedModule } from '../shared/shared.module';
import { StudentsRoutingModule } from './students-routing.module';
/* Components */
import { ListaDeEstudiantesComponent } from './componets/lista-de-estudiantes/lista-de-estudiantes.component';
import { EstudiantesFormComponent } from './componets/estudiantes-form/estudiantes-form.component';
import { StudentsComponent } from './componets/students/students.component';

@NgModule({
  declarations: [
    ListaDeEstudiantesComponent,
    EstudiantesFormComponent,
    StudentsComponent,
  ],
  imports: [CommonModule, SharedModule, StudentsRoutingModule],
  exports: [
    ListaDeEstudiantesComponent,
    EstudiantesFormComponent,
    StudentsComponent,
  ],
})
export class StudentsModule {}
