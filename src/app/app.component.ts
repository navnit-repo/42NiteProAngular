import { Component, OnInit } from "@angular/core";
import { User } from "./model/user";
import { AuthUserService } from "./authUserService/auth-user.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "appnite";
  userProfile: User;

  router: any;
  constructor(private _router: Router, ) {
    this.router = _router.url;

  }

  ngOnInit() {
    console.log(this.router,'console')
    // if(this.userProfile == undefined) {
    //   this._router.navigate(["/signin"]);
    //}
  }

}
