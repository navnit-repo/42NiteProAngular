import { Component, OnInit } from "@angular/core";
import { AuthUserService } from "../authUserService/auth-user.service";
import { User } from "../model/user";
import { Subscription } from "rxjs";
import { first } from "rxjs/operators";
import { UserData } from "../model/user-data";

@Component({
  selector: "app-side-bar-menu",
  templateUrl: "./side-bar-menu.component.html",
  styleUrls: ["./side-bar-menu.component.css"]
})
export class SideBarMenuComponent implements OnInit {
  //User data
  userProfile: any;
  currentUser: any;
  currentUserSubscription: Subscription;
  userRole: any;
  viewUserData: any;
  userImagePlaceHolderURL =
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

  constructor(private authUserService: AuthUserService) {}

  ngOnInit() {
    this.getUserData();
    this.authUserService._refreshNeeded$.subscribe(() => {
       this.getUserData();
    });
  }

  //getting user login and profile data
  private getUserData() {
    this.currentUserSubscription = this.authUserService.currentUser.subscribe(
      data => {
        this.userProfile = data.data;
        this.userRole = this.userProfile.user_role;
        let user_id = this.userProfile.user_id;

        //console.log(this.userRole,'user role')
      }
    );
    this.authUserService
      .getUserProfileData(this.userProfile.user_id)
      .subscribe(data => {
        this.viewUserData = data;
      });
  }
  //Getting User Data
  getUserImage() {
    if (this.userProfile.profile_pic_url == "") {
      return this.userImagePlaceHolderURL;
    } else if (this.userProfile.profile_pic_url != "") {
      return this.userProfile.profile_pic_url;
    }
  }

  getUserName() {
    if (this.viewUserData) {
      return this.viewUserData.data.name;
    }
  }

  //Side bar drop down menu
  onEventMenuClick() {
    var element = document.getElementById("event-menu");
    var ulClass = element.classList[0];
    if (ulClass == undefined) {
      element.classList.add("block");
    } else if (ulClass == "block") {
      element.classList.remove("block");
    }
  }

  onVenueMenuClick() {
    var element = document.getElementById("venue-menu");
    var ulClass = element.classList[0];
    if (ulClass == undefined) {
      element.classList.add("block");
    } else if (ulClass == "block") {
      element.classList.remove("block");
    }
  }

  onSocialReportMenuClick() {
    var element = document.getElementById("social-report");
    var ulClass = element.classList[0];
    if (ulClass == undefined) {
      element.classList.add("block");
    } else if (ulClass == "block") {
      element.classList.remove("block");
    }
  }

  onLogout() {
    console.log("logout");
    this.authUserService.getUserLogout();
  }
}

//this.loginCurrentUserSubscription = this.authUserService.loginCurrentUser.subscribe(data => {
//console.log(data,'data from sidebar')
//  this.loginUserProfile = data.data;
// })
//  this.currentUserSubscription = this.authUserService.loginCurrentUser.subscribe(
// user => {
//   console.log(user,'here is user');
// this.userProfile = user.data;

// })
