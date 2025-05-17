import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
export const adminGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  if (localStorage.getItem('adminSkyVoyager')) {
    return true;
  } else {
    return _Router.navigateByUrl('/login');
  }
};
