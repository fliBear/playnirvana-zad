import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { Grant, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      const user: User = this.userService.getCurrentUser();
      if (user) {
          if ((route.data["roles"] as Grant[]).some((r) => user.grants.indexOf(r) >= 0)) {
            return true;
          }

          console.log("not authorized")
          this.router.navigateByUrl("/dashboard");
          return false;
      }

      this.router.navigateByUrl("/login");
      return false;
  }
  
}
