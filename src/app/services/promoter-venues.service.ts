import { Injectable, NgZone } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { User } from "../model/user";
import { UserData } from "../model/user-data";
import { Router } from "@angular/router";
import { AuthUserService } from "../authUserService/auth-user.service";
// import { ToastrService } from 'ngx-toastr';

@Injectable()
export class PromoterVenuesService {

  loading = false;

  constructor(
    private http: HttpClient,
    public router: Router,
    //  private toastr: ToastrService,
    private authUserService: AuthUserService
  ) {
    
  }



  
  private venueListSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public $venueListObeservable = this.venueListSubject.asObservable();

  private venueActionSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public $venueActionObeservable = this.venueActionSubject.asObservable();

  private unaffiliatedVenueList: any;
  private requestedAffiliationVenueList: any;
  
  fetchAllVenueList(){
    this.getUnaffiliatedVenues();
    this.getRequestedAffiliationVenues();
  }

//unaffiliated list
 unaffiliatedListTrigger: Subject<void> = new Subject();

  getUnaffiliatedVenues() {
    let requestURL = "https://www.whats42nite.com/production/apiv2/promoter/getUnaffiliatedVenues";
    let body = new HttpParams().set("user_id", this.authUserService.user_id);

    return this.http
      .post(requestURL, body, {
        headers: new HttpHeaders().set(
          "Content-Type",
          "application/x-www-form-urlencoded"
        )
      })
      .subscribe(data => {
        this.unaffiliatedVenueList = data.data;        
        this.venueListSubject.next({
             "type":"unaffiliatedVenueList",
            "list":this.unaffiliatedVenueList
          }
      );
      this.unaffiliatedListTrigger.next();
    });
  }

  //requested affiliated venue list

 requestedListTrigger: Subject<void> = new Subject();

  getRequestedAffiliationVenues() {
    let requestURL = "https://www.whats42nite.com/production/apiv2/promoter/getVenueAffiliationRequests";
    let body = new HttpParams().set("user_id", this.authUserService.user_id);

    return this.http
      .post(requestURL, body, {
        headers: new HttpHeaders().set(
          "Content-Type",
          "application/x-www-form-urlencoded"
        )
      })
      .subscribe(data => {
        this.requestedAffiliationVenueList = data.data;        
        this.venueListSubject.next(
          {
            "type":"requestedAffiliationVenueList",
            "list":this.requestedAffiliationVenueList
          }
        );
        this.requestedListTrigger.next();
      });
  }

  requestVenueAffiliation(venueId : string) {
    this.loading = true;
    let requestURL = "https://www.whats42nite.com/production/apiv2/promoter/sendAffiliationRequest";
    let body = new HttpParams().set("promoter_id", this.authUserService.user_id)
    .set("venue_id", venueId);
    

    return this.http
      .post(requestURL, body, {
        headers: new HttpHeaders().set(
          "Content-Type",
          "application/x-www-form-urlencoded"
        )
      })
      .subscribe(data => {
         this.loading = false;
        if(data && data.status && data.status == "success"){
         
          // this.toastr.success("Venue affiliation request successful.");
          this.requestedAffiliationVenueList = data.data;
          this.venueActionSubject.next({
            "type":"requestedAffiliationVenueList",
            "list":this.requestedAffiliationVenueList
          })
        }else{
          // this.toastr.error("Error while venue affiliation request.");
        }        
        // this.venueListSubject.next({"requestedAffiliationVenueList":this.requestedAffiliationVenueList});
      });
  }


  unaffiliateVenue(venueId : string) {
    this.loading=true;
    let requestURL = "https://www.whats42nite.com/production/apiv2/promoter/unaffiliateVenue";
    let body = new HttpParams().set("user_id", this.authUserService.user_id)
    .set("venue_id", venueId);
    

    return this.http
      .post(requestURL, body, {
        headers: new HttpHeaders().set(
          "Content-Type",
          "application/x-www-form-urlencoded"
        )
      })
      .subscribe(data => {
        console.log(data);
        this.loading = false;
        if(data && data.status && data.status == "success"){

          // this.toastr.success("Venue unaffiliation successful.");
        }else{
          // this.toastr.error("Error while unaffiliating venue.");
          alert(data.message);
        }        
        // this.venueListSubject.next({"requestedAffiliationVenueList":this.requestedAffiliationVenueList});
      });
  }

}