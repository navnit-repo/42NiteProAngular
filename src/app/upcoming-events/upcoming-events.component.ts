import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { EventsService } from "../services/events.service";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Component({
  selector: "app-upcoming-events",
  templateUrl: "./upcoming-events.component.html",
  styleUrls: ["./upcoming-events.component.css"]
})
export class UpcomingEventsComponent implements OnInit {
  //upcomig event list
  upcomingEventsList: any;
  upcomingEventsSubscription: Subscription;
  upcomingEventListLength: any;

  //datatable options
  dtOptions: DataTables.Settings = {};
  upcomingTrigger: Subject<any> = new Subject();

  routerUrl
  constructor(private eventsService: EventsService, public router: Router) {
  this.routerUrl = router.url;
  }

  ngOnInit() {
    console.log("working");
    //upcoming events methods call
    this.subscribeUpcomingEventData();
    this.eventsService.refreshUpcomingEventsList();
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
          this.upcomingTrigger.next();
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
    this.upcomingEventsSubscription = this.eventsService.refreshUpcomingEventsList();
  }
}
