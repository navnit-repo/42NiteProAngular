import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { EventsService } from "../services/events.service";
import { Router } from "@angular/router";
import { map, tap } from "rxjs/operators";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Component({
  selector: "app-past-events",
  templateUrl: "./past-events.component.html",
  styleUrls: ["./past-events.component.css"]
})
export class PastEventsComponent implements OnInit {
  //past event list
  pastEventsList: any;
  pastEventsSubscription: Subscription;
  pastEventListLength: any;

  //datatable options
  dtOptions: DataTables.Settings = {};
  pastEventTrigger: Subject<any> = new Subject();

  constructor(private eventsService: EventsService, public router: Router) {}

  ngOnInit(): void {
    this.pastEventTrigger.subscribe();
    this.subscribePastEventData();
    this.eventsService.refreshPastEventsList();
  }

  public subscribePastEventData() {
    this.dtOptions = {
      pageLength: 10,
      retrieve: true,
      paging: true,
      searching: true
    };
    this.pastEventsSubscription = this.eventsService.$pastEventsObservable.subscribe(
      data => {
        this.pastEventTrigger.next()
        console.log(data, "here is the list of past events");
        if (data) {
          this.pastEventsList = data.list;
          this.pastEventListLength = data.list.length;
            
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

  onrefresh() {
    this.eventsService.refreshPastEventsList();
  }

}
