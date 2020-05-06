import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class EventsService {
  //upcoming event list
  private upcomingEventsListURL =
    "https://cors-anywhere.herokuapp.com/https://www.whats42nite.com/json/upcoming_events.json";
  private upcomingEventsSubject: BehaviorSubject<any> = new BehaviorSubject<
    any
  >(null);
  public $upcomingEventsObservable = this.upcomingEventsSubject.asObservable();
  private upcomingEventsList: any;

  //past events list
  private pastEventsListURL =
    "https://cors-anywhere.herokuapp.com/https://www.whats42nite.com/json/past_events.json";

  private pastEventsListSubject: BehaviorSubject<any> = new BehaviorSubject<
    any
  >(null);
  public $pastEventsListObservable = this.pastEventsListSubject.asObservable();
  private pastEventsList: any;

  //constructor
  constructor(private http: HttpClient) {}

  //method to refresh upcoming event list
  refreshUpcomingEventsList() {
    return this.http.get<any>(this.upcomingEventsListURL).subscribe(data => {
      this.upcomingEventsList = data.data;
      this.upcomingEventsSubject.next(this.upcomingEventsList);
    });
  }

  //method to refresh past events list
  refreshPastEvetsList() {
    return this.http.get<any>(this.pastEventsListURL).subscribe(data => {
      this.pastEventsList = data.data;
      this.pastEventsListSubject.next(this.pastEventsList);
    });
  }
}
