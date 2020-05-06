import { Component, OnInit, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { EventsService } from "../services/events.service";

@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.css"]
})
export class EventsComponent implements OnInit {
  @Input("eventListType")
  eventListType: string;

  //upcomig event list
  upcomingEventsList: any;
  upcomingEventsSubscription: Subscription;

  //past events list
  pastEventsList: any;
  pastEventsListSubscription: Subscription;

  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    // alert(this.eventListType);

    //upcoming events methods call
    this.subscribeUpcomingEventData();
    this.eventsService.refreshUpcomingEventsList();

    //past events methods call
    // this.subscribePastEventsList();
    //this.eventsService.refreshPastEvetsList();
  }

  //upcoming events method
  public subscribeUpcomingEventData() {
    this.upcomingEventsSubscription = this.eventsService.$upcomingEventsObservable.subscribe(
      data => {
        console.log(data);
        if (data) {
          this.upcomingEventsList = data;
        }
      }
    );
  }

  //past events method
  // public subscribePastEventsList() {
  //   this.pastEventsListSubscription = this.eventsService.$pastEventsListObservable.subscribe(
  //     data => {
  //       if (data) {
  //         this.pastEventsList = data;
  //       }
  //     }
  //   );
  // }
}
