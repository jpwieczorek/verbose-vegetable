import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ManageUserService } from './manage-user.service';
import { Auth } from 'aws-amplify';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      return new Promise ((resolve) => {
        Auth.currentAuthenticatedUser({bypassCache: false})
        .then ((user) => {
        if (user) { 
          return resolve (true); 
          }
        })
        .catch (() => {
          this.router.navigate(['/login']);
          return resolve (false);
        });
    })
  }
  
  constructor (
    private manageUser: ManageUserService,
    private router: Router
  ) {}
}