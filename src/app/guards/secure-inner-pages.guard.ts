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
export class SecureInnerPagesGuard implements CanActivate {
  constructor(
    private authUserService: AuthUserService,
    public router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authUserService.isLoggedIn) {
     // window.alert("You are not allowed to access this URL!");
      this.router.navigate(["user-profile"]);
    }
    return true;
  }
}
