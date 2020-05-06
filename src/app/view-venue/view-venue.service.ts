import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ViewVenueService {
  private viewVenueURL =
    "https://cors-anywhere.herokuapp.com/https://www.whats42nite.com/json/viewVenue.json";

  private viewVenueSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  public $viewVenueObservable = this.viewVenueSubject.asObservable();
  private viewVenueDetails: any;

  //constructor
  constructor(private http: HttpClient) {}

  refreshViewVenueDetails() {
    return this.http.get<any>(this.viewVenueURL).subscribe(data => {
      this.viewVenueDetails = data.data;
      this.viewVenueSubject.next(this.viewVenueDetails);
    });
  }
}
