import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { IStudent } from '../../students/interfaces/student';
const testUser: IStudent | undefined = {
  id: 1,
  firstName: 'Test',
  lastName: 'Test',
  email: 'test@test.test',
  password: 'password',
  role: 'USER',
};
describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should login successfully', () => {
    const mockStudent: IStudent = {
      id: 1,
      firstName: 'Test',
      lastName: 'Test',
      email: 'test@test.test',
      password: 'password',
      role: 'USER',
    };
    const email = 'test@test.test';
    const password = 'password';

    authService.login(email, password).subscribe((student) => {
      expect(student).toEqual(mockStudent);
    });

    const req = httpMock.expectOne(
      'https://630809c246372013f5757c8c.mockapi.io/Student'
    );
    expect(req.request.method).toBe('GET');

    req.flush([mockStudent]);
    httpMock.verify();
  });

  it('should save identity', () => {
    const mockStudent: IStudent = {
      id: 1,
      firstName: 'Test',
      lastName: 'Test',
      email: 'test@test.test',
      password: 'password',
      role: 'USER',
    };

    authService.saveIdentity(mockStudent);

    expect(authService.identity).toEqual(mockStudent);
    authService.identity$.subscribe((identity) => {
      expect(identity).toEqual(mockStudent);
    });
  });

  it('should get identity', () => {
    const mockStudent: IStudent = {
      id: 1,
      firstName: 'Test',
      lastName: 'Test',
      email: 'test@test.test',
      password: 'password',
      role: 'USER',
    };
    authService.identity = mockStudent;

    const identity = authService.getIdentity();

    expect(identity).toEqual(mockStudent);
  });

  it('should remove identity', () => {
    const mockStudent: IStudent = {
      id: 1,
      firstName: 'Test',
      lastName: 'Test',
      email: 'test@test.test',
      password: 'password',
      role: 'USER',
    };
    authService.identity = mockStudent;

    authService.removeIdentity();

    expect(authService.identity).toBeNull();
    authService.identity$.subscribe((identity) => {
      expect(identity).toBeNull();
    });
  });
});
