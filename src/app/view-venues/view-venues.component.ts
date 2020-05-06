import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthUserService } from "../authUserService/auth-user.service";
import { VenueService } from "../services/venue.service";
import { PromoterVenuesService } from "../services/promoter-venues.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-view-venues",
  templateUrl: "./view-venues.component.html",
  styleUrls: ["./view-venues.component.css"]
})
export class ViewVenuesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  venuesList: [];
  unaffiliatedVenueList: [];
  requestedAffiliationVenueList: [];

  venueListLength;
  requestVenueLength;
  pendingReqLength



  //loadings
  pageLoading = true;
  screenLoading = false;

  //venue data
  venueListSubscription: Subscription;
  unaffiliatedVenueListSubscription: Subscription;
  requestedAffiliationListSubscription: Subscription;

  //User Data
  currentUserSubscription: Subscription;
  user_id: number;
  owner_name: any;
  currentUser: any;
  userRole: any;

  constructor(
    private authUserService: AuthUserService,
    private venueService: VenueService,
    private promoterVenueService: PromoterVenuesService,
    public router: Router
  ) {}

  showPromotersVenueList() {
    return this.authUserService.getUserRole() == "Promoter";
  }

  //setting pagination and record per pages mathods


  ngOnInit() {
    this.userRole = this.authUserService.user_role;
    console.log(this.userRole);
    //console.log(this.authUserService.getUserRole(),'user role');
    this.subscribeVenueListData();
    this.venueService.getVenuesDetails();
    if (this.authUserService.getUserRole() == "Promoter") {
      this.promoterVenueService.fetchAllVenueList();
    }
  }

  public subscribeVenueListData() {
    this.dtOptions = {
      pageLength: 10,
      retrieve: true,
      paging: true,
      searching: true
    };

    this.venueListSubscription = this.venueService.$venueListObeservable.subscribe(
      data => {
        //this.venueService.dtTrigger.subscribe();
        if (data != null) {
          this.pageLoading = false;
          this.venuesList = data;
          this.venueListLength = data.length;
         
          console.log(this.venuesList, "venue list data");
        }
      }
    );

    this.unaffiliatedVenueListSubscription = this.promoterVenueService.$venueListObeservable.subscribe(
      data => {
        console.log(data, "unaffiliatedVenueListSubscription");
        // console.log(JSON.stringify(data));
        if (data && data.type) {
          this.pageLoading = false;
          if (data.type == "unaffiliatedVenueList") {
            this.unaffiliatedVenueList = data.list;
            this.requestVenueLength = data.list.length;
          
            console.log(data.list.length, "length");
          } else if (data.type == "requestedAffiliationVenueList") {
            this.requestedAffiliationVenueList = data.list;
            this.pendingReqLength = data.list.length;
           
            console.log(data.list.length, "length2");
          }
        }
      }
    );
  }



  getOwnerName() {
    if (this.owner_name) {
      return this.owner_name.data.name;
    }
  }
  deleteVenue(venue_id) {
    this.screenLoading = true;
    this.venueListSubscription = this.venueService
      .deleteVenue(venue_id)
      .subscribe(data => {
        if (data) {
          console.log(data);
          this.screenLoading = false;
          this.subscribeVenueListData();
        }
      });
  }
  viewVenue(venue_id) {
    console.log(venue_id);
    this.venueService.viewOneVenue(venue_id).subscribe(data => {
      let venue_id = data.data.venue_id;
      this.router.navigate(["view-venue"], {
        queryParams: {
          venue_id: venue_id
        }
      });
    });
  }

  onEditVenue(venue_id) {
    console.log(venue_id);
    this.router.navigate(["add-venue"], {
      queryParams: {
        venue_id: venue_id
      }
    });
  }

  requestingVenueAffiliation(venue_id) {
    this.screenLoading = true;
    console.log(venue_id);
    this.requestedAffiliationListSubscription = this.promoterVenueService.requestVenueAffiliation(
      venue_id
    );
  }

  unaffiliateVenue(venue_id) {
    this.screenLoading = true;
    console.log(venue_id);
    this.unaffiliatedVenueListSubscription = this.promoterVenueService.unaffiliateVenue(
      venue_id
    );
  }
}
