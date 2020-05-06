import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class UserProfileService {
  private venuesDetailsURL =
    "https://cors-anywhere.herokuapp.com/https://www.whats42nite.com/json/venuesDetails.json";

  private venuesDetailsSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  public $venuesDetailsObservable = this.venuesDetailsSubject.asObservable();
  private venuesDetails: any;

  constructor(private http: HttpClient) {}

   refreshVenuesDetails() {
    return this.http.get<any>(this.venuesDetailsURL).subscribe(data => {
      this.venuesDetails = data.data;
      this.venuesDetailsSubject.next(this.venuesDetails);
    });
  }
}
