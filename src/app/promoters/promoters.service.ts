import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class PromotersService {
  //promoter request list
  private promotersRequestListURL =
    "https://cors-anywhere.herokuapp.com/https://www.whats42nite.com/json/promoters_request.json";

  private promotersRequestSubject: BehaviorSubject<any> = new BehaviorSubject<
    any
  >(null);
  public $promotersRequestObservable = this.promotersRequestSubject.asObservable();
  private promotersRequestList: any;

  //promoter list
  private promotersListURL =
    "https://cors-anywhere.herokuapp.com/https://www.whats42nite.com/json/promoters_list.json";

  private promotersListSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  public $promotersListObservable = this.promotersListSubject.asObservable();
  private promotersList: any;

  //Affiliated promoter list
  private affiliatedPromotersListURL =
    "https://cors-anywhere.herokuapp.com/https://www.whats42nite.com/json/affiliated_promoters.json";

  private affiliatedPromotersListSubject: BehaviorSubject<
    any
  > = new BehaviorSubject<any>(null);
  public $affiliatedPromotersListObservable = this.affiliatedPromotersListSubject.asObservable();
  private affiliatedPromotersList: any;

  //constructor
  constructor(private http: HttpClient) {}

  //method to refresh promoter request list
  refreshPromotersRequestList() {
    return this.http.get<any>(this.promotersRequestListURL).subscribe(data => {
      this.promotersRequestList = data.data;
      this.promotersRequestSubject.next(this.promotersRequestList);
    });
  }

  //method to refresh promoter list
  refreshPromotersList() {
    return this.http.get<any>(this.promotersListURL).subscribe(data => {
      this.promotersList = data.data;
      this.promotersListSubject.next(this.promotersList);
    });
  }

  //method to refresh affiliated promoter list
  refreshAffiliatedPromotersList() {
    return this.http.get<any>(this.affiliatedPromotersListURL).subscribe(data => {
      this.affiliatedPromotersList = data.data;
      this.affiliatedPromotersListSubject.next(this.affiliatedPromotersList);
    });
  }
}
