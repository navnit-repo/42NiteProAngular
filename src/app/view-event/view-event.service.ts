import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ViewEventService {
  private viewEventURL = "https://cors-anywhere.herokuapp.com/https://www.whats42nite.com/json/viewUpcomingEvent.json";
  private viewEventSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public $viewEventObservable = this.viewEventSubject.asObservable();
  private viewEventDetail: any;

  constructor(private http: HttpClient) {}

  refreshViewEvent() {
    return this.http.get<any>(this.viewEventURL).subscribe(data => {
      this.viewEventDetail = data.data;
      this.viewEventSubject.next(this.viewEventDetail);
    })
  }
}
