import { CanActivateFn, Router } from '@angular/router';

import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

export const usuarioLogadoGuard: CanActivateFn = async (route, state) => {
  //return true;
  const authService = inject(AuthService);
  const router = inject(Router);

  if(await authService.logado()){
    return true;
  }
  else{
    router.navigate(['/'])
    return false;
  }
};
