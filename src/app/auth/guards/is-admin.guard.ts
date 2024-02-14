import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
/* Services */
import { AuthService } from '../services/auth.service';
export const isAdminGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const student = _authService.getIdentity();
  if (!student || student.role !== 'ADMIN') {
    alert('No tienes permiso para entrar a esta página.');
    /* Redirect to "/" */
    const router = inject(Router);
    router.navigate(['/']);
    return false;
  } else {
    return true;
  }
};
