import { Injectable, NgZone } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { User } from "../model/user";
import { UserData } from "../model/user-data";
import { Router } from "@angular/router";
import { AuthUserService } from "../authUserService/auth-user.service";

@Injectable()
export class VenueService {
  //Refresh Needed by subject

  public _refreshNeeded$ = new Subject<void>();
  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  constructor(
    private http: HttpClient,
    public router: Router,
    private authUserService: AuthUserService
  ) {
    
  }

  //Add Venue URL
  addVenueURL = "https://www.whats42nite.com/production/apiv2/pro/createVenue";

  //Add Venue Method
  addVenue(
    user_id,
    venue_name,
    description,
    email,
    latitude,
    longitude,
    contact_no,
    venue_type,
    address,
    city,
    country,
    zipcode,
    state,
    schedule,
    imageFile
  ) {
    const body = new HttpParams()
      .set("user_id", user_id)
      .set("venue_name", venue_name)
      .set("description", description)
      .set("email", email)
      .set("latitude", latitude)
      .set("longitude", longitude)
      .set("contact_no", contact_no)
      .set("venue_type", venue_type)
      .set("address", address)
      .set("city", city)
      .set("country", country)
      .set("zipcode", zipcode)
      .set("state", state)
      .set("opening_schedule", JSON.stringify(schedule))
     // .set('image',imageFile)
      .set('image',imageFile)

    return this.http
      .post(this.addVenueURL, body, {
        headers: new HttpHeaders().set(
          "Content-Type",
          "application/x-www-form-urlencoded"
        )
      })
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  //View Venue URL
  dtTrigger: Subject<void> = new Subject();
  $dtTriggerObservable = this.dtTrigger.asObservable();

  private venueListSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  public $venueListObeservable = this.venueListSubject.asObservable();
  private venueList: any;
  private getVenueURL =
    "https://www.whats42nite.com/production/apiv2/pro/getVenues";

  getVenuesDetails() {
    const body = new HttpParams().set("user_id", this.authUserService.user_id);

    return this.http
      .post(this.getVenueURL, body, {
        headers: new HttpHeaders().set(
          "Content-Type",
          "application/x-www-form-urlencoded"
        )
      })
      .subscribe(data => {
        this.venueList = data.data;
        this.venueListSubject.next(this.venueList);
        this.dtTrigger.next();
      });
  }

  //SearchVenue
  searchVenue(keyword) {
    const body = new HttpParams()
      .set("user_id", this.authUserService.user_id)
      .set("keyword", keyword);

    return this.http.post(this.getVenueURL, body, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      )
    });
  }

  //delete venue
  private deleteVenueURL =
    "https://www.whats42nite.com/production/apiv2/pro/removeVenue";

  deleteVenue(venue_id) {
    const body = new HttpParams()
      .set("user_id", this.authUserService.user_id)
      .set("venue_id", venue_id);

    return this.http
      .post(this.deleteVenueURL, body, {
        headers: new HttpHeaders().set(
          "Content-Type",
          "application/x-www-form-urlencoded"
        )
      })
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  //View one venue
  venueDetail: any;
  private viewOneVenueURL =
    "https://www.whats42nite.com/production/apiv2/pro/getVenueDetail";
  viewOneVenue(venue_id) {
    const body = new HttpParams()
      .set("user_id", this.authUserService.user_id)
      .set("venue_id", venue_id);

    return this.http
      .post(this.viewOneVenueURL, body, {
        headers: new HttpHeaders().set(
          "Content-Type",
          "application/x-www-form-urlencoded"
        )
      })
    
  }

 //Edit Venue
 updateVenueURL = "https://www.whats42nite.com/production/apiv2/pro/updateVenue";

  updateVenue(
    venue_id,
    venue_name,
    description,
    email,
    latitude,
    longitude,
    contact_no,
    venue_type,
    address,
    city,
    country,
    zipcode,
    state,
    schedule
  ) {
    const body = new HttpParams()
      .set("user_id", this.authUserService.user_id)
      .set("venue_id", venue_id)
      .set("venue_name", venue_name)
      .set("description", description)
      .set("email", email)
      .set("latitude", latitude)
      .set("longitude", longitude)
      .set("contact_no", contact_no)
      .set("venue_type", venue_type)
      .set("address", address)
      .set("city", city)
      .set("country", country)
      .set("zipcode", zipcode)
      .set("state", state)
      .set("opening_schedule", JSON.stringify(schedule));

    return this.http
      .post(this.updateVenueURL, body, {
        headers: new HttpHeaders().set(
          "Content-Type",
          "application/x-www-form-urlencoded"
        )
      })
  }

  //get venue followers list 
  private followersListSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  public $followersListObservable = this.followersListSubject.asObservable();

  private followersList: any;

  getVenueFollowersList() {
    let requestURL = "https://www.whats42nite.com/production/apiv2/pro/getVenueFollowersList";
        const body = new HttpParams()
      .set("user_id", this.authUserService.user_id);

      return this.http
      .post(requestURL, body, {
        headers: new HttpHeaders().set(
          "Content-Type",
          "application/x-www-form-urlencoded"
        )
      })
      .subscribe(data => {
        console.log(data.data, "data from service");
        this.followersList = data.data;
        this.followersListSubject.next({
          type: "followers list",
          list: this.followersList
        });
      });
      
  }

}
