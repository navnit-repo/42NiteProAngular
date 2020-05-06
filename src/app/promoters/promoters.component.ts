import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { PromotersService } from "./promoters.service";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { PromoterService } from "../services/promoter.service";

@Component({
  selector: "app-promoters",
  templateUrl: "./promoters.component.html",
  styleUrls: ["./promoters.component.css"]
})
export class PromotersComponent implements OnInit {
  //data table options
  dtOptions: DataTables.Settings = {
    pageLength: 10,
    retrieve: true,
    paging: true,
    searching: true
  };
  promoterRequestTrigger: Subject<any> = new Subject();
  promotersTrigger: Subject<any> = new Subject();
  affiliatedPromotersTrigger: Subject<any> = new Subject();

  //promoter request list
  promotersRequestList: any;
  promotersRequestListSubscription: Subscription;

  //promoter  list
  promotersList: any;
  promotersListSubscription: Subscription;

  //promoter  list
  affiliatedPromotersList: any;
  affiliatedPromotersListSubscription: Subscription;

  constructor(
    private promotersService: PromotersService,
    private promService: PromoterService
  ) {}

  ngOnInit() {
    this.subscribePromotersRequestList();
    this.promotersService.refreshPromotersRequestList();

    this.subscribePromotersList();
    this.promService.refreshPromotersList();

    this.subscribeAffiliatedPromotersList();
    this.promotersService.refreshAffiliatedPromotersList();
  }

  public subscribePromotersRequestList() {
    this.dtOptions;
    this.promotersRequestListSubscription = this.promotersService.$promotersRequestObservable.subscribe(
      data => {
        if (data) {
          this.promotersRequestList = data;
          this.promoterRequestTrigger.next();
        }
      }
    );
  }

  public subscribePromotersList() {
    this.dtOptions;
    this.promotersListSubscription = this.promService.$promotersListObservable.subscribe(
      data => {
        if (data) {
          console.log(data,'data from promoter list')
          this.promotersTrigger.next();
          this.promotersList = data.list;
        }
      }
    );
  }

  public subscribeAffiliatedPromotersList() {
    this.dtOptions;
    this.affiliatedPromotersListSubscription = this.promotersService.$affiliatedPromotersListObservable.subscribe(
      data => {
        if (data) {
          this.affiliatedPromotersList = data;
          this.affiliatedPromotersTrigger.next();
        }
      }
    );
  }
}
