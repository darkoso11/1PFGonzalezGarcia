import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-estudiantes-form',
  templateUrl: './estudiantes-form.component.html',
  styleUrl: './estudiantes-form.component.scss'
})
export class EstudiantesFormComponent {
  @Output() 
  userSubmitted = new EventEmitter(); // Declara el evento

  userForm: FormGroup
  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      lastName: this.fb.control('',Validators.required),
      firstName: this.fb.control('',Validators.required),
      career: this.fb.control('',Validators.required),
      address: this.fb.control('',Validators.required),
      password: this.fb.control('',Validators.required),
      email: this.fb.control('',Validators.required),
      role: this.fb.control('',Validators.required),
    })

  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this.userSubmitted.emit(this.userForm.value);
      this.userForm.reset();
    }
  }

}
