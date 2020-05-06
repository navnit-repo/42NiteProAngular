import { Injectable, NgZone } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { User } from "../model/user";
import { UserData } from "../model/user-data";
import { Router } from "@angular/router";
import { AuthUserService } from "../authUserService/auth-user.service";

@Injectable()
export class PromoterService {
  //https://www.whats42nite.com/production/apiv2/users/promoter_list

  constructor(
    private http: HttpClient,
    public router: Router,
    private authUserService: AuthUserService
  ) {}

  //get promoter list 
    private promotersListSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  public $promotersListObservable = this.promotersListSubject.asObservable();

  private promotersList: any;

  refreshPromotersList() {
    let requestURL =
      "https://www.whats42nite.com/production/apiv2/users/promoter_list";
    let body = new HttpParams().set("user_id", this.authUserService.user_id);

    return this.http.post(requestURL, body, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      )
    })
      .subscribe(data => {
        console.log(data, "data from service");
        this.promotersList = data.data;
        this.promotersListSubject.next({
          type: "promoters list ",
          list: this.promotersList
        });
      });
  }
}
