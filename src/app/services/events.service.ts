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
export class EventsService {
  constructor(
    private http: HttpClient,
    public router: Router,
    private authUserService: AuthUserService
  ) {}

  //Upcoming Event List
  private upcomingEventSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  public $upcomingEventsObservable = this.upcomingEventSubject.asObservable();

  private upcomingEventList: any;

//  upcomingTrigger: Subject<any> = new Subject();

  refreshUpcomingEventsList() {
    let requestURL =
      "https://www.whats42nite.com/production/apiv2/pro/getEvents";
    let body = new HttpParams()
      .set("user_id", this.authUserService.user_id)
      .set("event_type", "1")
      .set("client_type", "angularApp"); 

    return this.http
      .post(requestURL, body, {
        headers: new HttpHeaders().set(
          "Content-Type",
          "application/x-www-form-urlencoded"
        )
      })
      .subscribe(data => {
        console.log(data, "data from service");
        this.upcomingEventList = data.data;
        this.upcomingEventSubject.next({
          type: "upcoming events",
          list: this.upcomingEventList
        });
      });
  }

  //Past Event List
  private pastEventSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  public $pastEventsObservable = this.pastEventSubject.asObservable();

  private pastEventList: any;

  // pastTrigger: Subject<any> = new Subject();

  refreshPastEventsList() {
    let requestURL =
      "https://www.whats42nite.com/production/apiv2/pro/getEvents";
    let body = new HttpParams()
      .set("user_id", this.authUserService.user_id)
      .set("event_type", "2")
      .set("client_type", "angularApp"); 

    return this.http
      .post(requestURL, body, {
        headers: new HttpHeaders().set(
          "Content-Type",
          "application/x-www-form-urlencoded"
        )
      })
      .subscribe(data => {
        console.log(data, "data from service");
        this.pastEventList = data.data;
        this.pastEventSubject.next({
          type: "past events",
          list: this.pastEventList
        });
           // this.pastTrigger.next();
      });
  }


  //add event

  addNewEvent(
    venue_id,
    event_name,
    event_description,
    event_age_group,
    event_dates,
    event_start_time,
    event_end_time,
    event_tickets,
    event_fee
  ) {
    let requestURL =
      "https://www.whats42nite.com/production/apiv2/pro/createEvent";
    let body = new HttpParams()
      .set("user_id", this.authUserService.user_id)
      .set("venue_id", venue_id)
      .set("event_name", event_name)
      .set("event_description", event_description)
      .set("event_age_group", event_age_group)
      .set("event_dates", event_dates)
      .set("event_start_time", event_start_time)
      .set("event_end_time", event_end_time)
      .set("event_tickets", event_tickets)
      .set("event_fee", event_fee);

    return this.http
      .post(requestURL, body, {
        headers: new HttpHeaders().set(
          "Content-Type",
          "application/x-www-form-urlencoded"
        )
      })
      .subscribe(data => {
        console.log(data, "data from service");
      });
  }

  //View one event details
  //  https://www.whats42nite.com/production/apiv2/pro/getEventDetail

  viewEventDetails(event_id) {
    let requestURL =
      "https://www.whats42nite.com/production/apiv2/pro/getEventDetail";
    let body = new HttpParams()
      .set("user_id", this.authUserService.user_id)
      .set("event_id", event_id);

    return this.http.post(requestURL, body, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      )
    });
  }

  //Delete Events

  deleteEvent(event_id) {
    let requestURL =
      "https://www.whats42nite.com/production/apiv2/pro/removeEvent";
    let body = new HttpParams()
      .set("user_id", this.authUserService.user_id)
      .set("event_id", event_id);

    return this.http.post(requestURL, body, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      )
    });
  }

  //Update event

  updateEvent(
    venue_id,
    event_name,
    event_description,
    event_age_group,
    event_dates,
    event_start_time,
    event_end_time,
    event_tickets,
    event_fee,
    parent_event_id,
    event_id
  ) {
    let requestURL =
      "https://www.whats42nite.com/production/apiv2/pro/updateEvent";
    let body = new HttpParams()
      .set("user_id", this.authUserService.user_id)
      .set("venue_id", venue_id)
      .set("event_name", event_name)
      .set("event_description", event_description)
      .set("event_age_group", event_age_group)
      .set("event_dates", event_dates)
      .set("event_start_time", event_start_time)
      .set("event_end_time", event_end_time)
      .set("event_tickets", event_tickets)
      .set("event_fee", event_fee)
      .set("parent_event_id", parent_event_id)
      .set("event_id", event_id);

    return this.http
      .post(requestURL, body, {
        headers: new HttpHeaders().set(
          "Content-Type",
          "application/x-www-form-urlencoded"
        )
      })
     
  }

  //get past event images 

   getPastEventImages(event_id,parent_event_id,venue_id) {
    let requestURL =
      "https://www.whats42nite.com/production/apiv2/pro/getPastEventImages";
    let body = new HttpParams()
      .set("user_id", this.authUserService.user_id)
      .set("event_id", event_id)
      .set("parent_event_id", parent_event_id)
      .set("venue_id", venue_id);

    return this.http.post(requestURL, body, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      )
    });
  }

}
