import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const guardUserGuard: CanActivateFn = (route, state) => {  
  const router = new Router();

  function checkUser() {
    if (localStorage.getItem('isUserLoggedIn') === 'true') {
      return true;
    } else {
      alert('You are not allowed to view this page. You will be redirected to login Page');
      router.navigate(['/login']);
      return false;
    }
  }

  return checkUser();
};
