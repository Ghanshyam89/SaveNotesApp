import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthguardGuard implements CanActivate {

  constructor(private router: Router) { }

  isLoggedin: string | null = '';
  
  isLoggedIn(): boolean {
    this.isLoggedin = localStorage.getItem('isLoggedIn');
    return this.isLoggedin === 'true';
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      return false;
    } else {
      return true;
    }
  }
}
