import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Modules */
import { SharedModule } from '../shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';
/* Components */
import { CoursesComponent } from './components/courses/courses.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesFormComponent } from './components/courses-form/courses-form.component';
/* Pipes */
import { ProfesorShowPipe } from './pipes/profesor-show.pipe';

@NgModule({
  declarations: [
    /* Courses */
    CoursesComponent,
    CoursesListComponent,
    CoursesFormComponent,
    /* Pipes */
    ProfesorShowPipe,
  ],
  imports: [CommonModule, SharedModule, CoursesRoutingModule],
  exports: [CoursesComponent, CoursesListComponent, CoursesFormComponent],
})
export class CoursesModule {}
