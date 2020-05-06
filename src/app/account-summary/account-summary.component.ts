import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { EventsService } from "../services/events.service";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { AccountSummaryService } from "./account-summary.service";
import { VenueService } from "../services/venue.service";

@Component({
  selector: "app-account-summary",
  templateUrl: "./account-summary.component.html",
  styleUrls: ["./account-summary.component.css"]
})
export class AccountSummaryComponent implements OnInit {
  //datatable options
  dtOptions: DataTables.Settings = {};
  followersListTrigger: Subject<any> = new Subject();
  upcomingTrigger2: Subject<any> = new Subject();
  pastEventTrigger2: Subject<any> = new Subject();

  //follower list
  followersList: any;
  followersListSubscription: Subscription;
  followersListLength;

  //upcomig event list
  upcomingEventsList: any;
  upcomingEventsSubscription: Subscription;
  upcomingEventListLength: any;

  //past event list
  pastEventsList: any;
  pastEventsSubscription: Subscription;
  pastEventListLength: any;

  constructor(
    private accountSummaryService: AccountSummaryService,
    private venueService: VenueService,
    private eventsService: EventsService,
    public router: Router
  ) {}

  ngOnInit() {
    this.subcribeFollowersListData();
    this.venueService.getVenueFollowersList();

    this.subscribeUpcomingEventData();
    this.eventsService.refreshUpcomingEventsList();

    this.subscribePastEventData();
    this.eventsService.refreshPastEventsList();
  }

  public subcribeFollowersListData() {
    this.dtOptions = {
      pageLength: 10,
      retrieve: true,
      paging: true,
      searching: true
    };
    this.followersListSubscription = this.venueService.$followersListObservable.subscribe(
      data => {
        if (data) {
          console.log(data, "data from acc summary");
          this.followersList = data.list;
          this.followersListLength = this.followersList.length;
          this.followersListTrigger.next();
          
        }
      }
    );
  }

  onRefreshFollowersList(){
     this.venueService.$followersListObservable.subscribe(
      data => {
        if (data) {
          console.log(data, "data from acc summary");
          this.followersList = data.list;
          this.followersListTrigger.next();
          
        }
      }
    );
  }

  //upcoming events method
  public subscribeUpcomingEventData() {
    this.dtOptions = {
      pageLength: 10,
      retrieve: true,
      paging: true,
      searching: true
    };
    this.upcomingEventsSubscription = this.eventsService.$upcomingEventsObservable.subscribe(
      data => {
        console.log(data, "here is the list of events");
        if (data) {
          this.upcomingEventsList = data.list;
          this.upcomingEventListLength = data.list.length;
          this.upcomingTrigger2.next();
        }
      }
    );
  }

  onViewEvent(event_id) {
    console.log(event_id);
    this.router.navigate(["view-event"], {
      queryParams: {
        event_id: event_id
      }
    });
  }

  onDeleteEvent(event_id) {
    console.log(event_id);
    this.eventsService.deleteEvent(event_id);
  }

  onEditEvent(event_id) {
    this.router.navigate(["add-event"], {
      queryParams: {
        event_id: event_id
      }
    });
  }

  onRefresh() {
    console.log("refresh working");
    this.eventsService.refreshUpcomingEventsList();
  }

  //past event methods
  public subscribePastEventData() {
    this.dtOptions = {
      pageLength: 10,
      retrieve: true,
      paging: true,
      searching: true
    };
    this.pastEventsSubscription = this.eventsService.$pastEventsObservable.subscribe(
      data => {
        this.pastEventTrigger2.next();
        console.log(data, "here is the list of past events");
        if (data) {
          this.pastEventsList = data.list;
          this.pastEventListLength = data.list.length;
        }
      }
    );
  }
  onViewPastEvent(event_id) {
    console.log(event_id);
    this.router.navigate(["view-event"], {
      queryParams: {
        event_id: event_id
      }
    });
  }

  onrefresh() {
    this.eventsService.refreshPastEventsList();
  }

  //toggle button 
  arrowDown = false;
  arrowToggle() {
    if(this.arrowDown == true) {
      this.arrowDown = false;
    } else if(this.arrowDown == false) {
      this.arrowDown = true;
    }
  }
}
