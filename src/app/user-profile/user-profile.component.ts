import { Component, OnInit } from "@angular/core";
import { AuthUserService } from "../authUserService/auth-user.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { UserProfileService } from "./user-profile.service";
import { first } from "rxjs/operators";
import { User } from "../model/user";
import { UserData } from "../model/user-data";
import { VenueService } from "../services/venue.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"]
})
export class UserProfileComponent implements OnInit {
  //User data
  userProfile: any;
  currentUser: any;
  currentUserSubscription: Subscription;
  viewUserData: any;
  userImagePlaceHolderURL =
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

    userRole:any;

  //venues details list
  venueListSubscription: Subscription;

  venueDetails: any;
  venueCount: number;

  //loadings
  pageLoading = true;
  deleteLoading = false;

  constructor(
    private router: Router,
    private userProfileService: UserProfileService,
    private authUserService: AuthUserService,
    private venueService: VenueService
  ) {}

  ngOnInit() {
    //user data
    this.currentUserSubscription = this.authUserService.currentUser.subscribe(
      user => {
        this.userProfile = user.data;
        let user_id = this.userProfile.user_id;
        this.userRole = user.data.user_role;
        console.log(this.userRole,'user role')
        //user profile data
        this.authUserService.getUserProfileData(user_id).subscribe(data => {
          //Auth service to get user data
          this.viewUserData = data;
        });
      }
    );
    this.subscribeVenueListData();
    this.venueService.getVenuesDetails();
  }

  public subscribeVenueListData() {
    this.venueListSubscription = this.venueService.$venueListObeservable.subscribe(
      data => {
        this.pageLoading = false;
        if (data != null) {
          console.log(data, "here is venue list");
          this.venueDetails = data;
          this.venueCount = data.length;
          console.log(this.venueCount);
        }
      }
    );
  }

  //search venue
  onSearchChange(keyword: string): void {
    this.venueService.searchVenue(keyword).subscribe(data => {
      // console.log(data.data);
      // this.venueDetails = data.data;
      console.log(data);
      if (data.status == "success") {
        this.venueDetails = data.data;
        this.venueCount = data.total_count;
      } else {
        this.venueDetails = [];
      }
    });

    console.log(keyword);
  }

  //Getting user data

  getUserName() {
    if (this.viewUserData) {
      return this.viewUserData.data.name;
    }
  }

  getUserEmail() {
    if (this.viewUserData) {
      return this.viewUserData.data.email;
    }
  }

  getUserMobileNumber() {
    if (this.userProfile) {
      return this.userProfile.mobile_no;
    }
  }

  getUserImage() {
    if (this.userProfile.profile_pic_url == "") {
      return this.userImagePlaceHolderURL;
    } else if (this.userProfile.profile_pic_url != "") {
      return this.userProfile.profile_pic_url;
    }
  }

  getVenueLength() {
    if (this.venueDetails) {
    }
  }

  //delete venue
  onDeleteVenue(venue_id) {
    this.venueService
      .deleteVenue(this.userProfile.user_id, venue_id)
      .subscribe(data => {
        console.log(data);
      });
  }

  //edit venue
    onEditVenue(venue_id) {
    console.log(venue_id);
    this.router.navigate(["add-venue"], {
      queryParams: {
        venue_id: venue_id
      }
    });
  }
  
  //caraousel count
  gettingIndexes(image, array) {
    return array.indexOf(image) + 1;
  }

  gettingImagesLength(images) {
    return images.length;
  }
}
