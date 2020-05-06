import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AccountSummaryService {
  //followersList
  private followersListURL =
    "https://cors-anywhere.herokuapp.com/https://www.whats42nite.com/json/followersList.json";

  private followersListSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  public $followersObservable = this.followersListSubject.asObservable();
  private followersList: any;

  //constructor
  constructor(private http: HttpClient) {}

  //method to refresh followers list
  refreshFollowerList() {
    return this.http.get<any>(this.followersListURL).subscribe(data => {
      this.followersList = data.data;
      this.followersListSubject.next(this.followersList);
    });
  }
}
