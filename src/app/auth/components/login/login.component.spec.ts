import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable, of } from 'rxjs';
import { IStudent } from '../../../students/interfaces/student';
const testUser: IStudent | undefined = {
  id: 1,
  firstName: 'Test',
  lastName: 'Test',
  email: 'test@test.test',
  password: 'password',
  role: 'USER',
};
class MockAuthService {
  login(email: string, password: string): Observable<IStudent | undefined> {
    return of(
      email === testUser?.email && password === testUser?.password
        ? testUser
        : undefined
    );
  }
  saveIdentity() {}
  // add other methods if needed
}
class MockRouter {
  navigate(route: string[]) {}
  // add other methods if needed
}
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientTestingModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        FormBuilder,
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.form.value).toEqual({ email: '', password: '' });
  });

  it('should call onSubmit method when form is submitted', () => {
    spyOn(component, 'onSubmit');
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should navigate to home page after successful login', () => {
    spyOn(router, 'navigate');

    spyOn(authService, 'login').and.returnValue(of(testUser));
    component.form.setValue({
      email: 'test@example.com',
      password: 'password',
    });
    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should not call authService.login when form is invalid', () => {
    spyOn(authService, 'login');
    component.form.setValue({
      email: '',
      password: '',
    });
    component.onSubmit();
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('should not navigate to home page after unsuccessful login', () => {
    spyOn(router, 'navigate');

    spyOn(authService, 'login').and.returnValue(of(undefined));
    component.form.setValue({
      email: 'test@test.com',
      password: 'password',
    });
    component.onSubmit();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });
});
