import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthUserService } from "../authUserService/auth-user.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authUserService: AuthUserService,
    public router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
       if(this.authUserService.isLoggedIn !== true) {
      this.router.navigate(['signin'])
    }
    return true;
  }
}
