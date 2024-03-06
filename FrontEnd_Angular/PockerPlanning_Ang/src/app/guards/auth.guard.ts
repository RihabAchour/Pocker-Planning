import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../core/models/role';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  userconnect = JSON.parse(localStorage.getItem("userconnect")!);

  constructor(private route: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isLoggedIn = !!localStorage.getItem("state");
      if (!isLoggedIn) {
        return true;
      } else {
        switch (this.userconnect.role) {
          case Role.ADMINISTRATOR:
            this.route.navigateByUrl('/admin');
            break;
          case Role.DEVELOPER:
            this.route.navigateByUrl('/developpeur');
            break;
          case Role.PROJECTMANAGER:
            this.route.navigateByUrl('/chefProjet');
            break;
          default:
            break;
        }
        return false;
      }
  }
  
}
