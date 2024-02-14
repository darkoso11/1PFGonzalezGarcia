import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
/* Services */
import { AuthService } from '../services/auth.service';

export const isLoggedGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const student = _authService.getIdentity();
  if (!student) {
    alert('Necesitas hacer login para entrar a esta página.');
    /* Redirect to "/" */
    const router = inject(Router);
    router.navigate(['/auth/login']);
    return false;
  } else {
    return true;
  }
};
