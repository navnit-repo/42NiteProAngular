import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";
import { EventsService } from "../services/events.service";
import {
  NgbDate,
  NgbCalendar,
  NgbDateParserFormatter
} from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";
import { VenueService } from "../services/venue.service";

@Component({
  selector: "app-add-event",
  templateUrl: "./add-event.component.html",
  styleUrls: ["./add-event.component.css"]
})
export class AddEventComponent implements OnInit {
  model: any;
  imageFile: File[] = [];

  addEventForm: FormGroup;
  addTicketForm: FormGroup;
  addPromoCodeForm: FormGroup;

  //collapse
  firstCollapseOpened = true;
  secondCollapseOpened = false;
  thirdCollapseOpened = false;

  //datepicker
  event_date;

  //venue list
  venuesList: [];
  venueListSubscription: Subscription;

  //Add Ticket
  addTicketTableData = [];
  show_before_input_in_add_ticket = false;

  //Add Promo Code
  addPromoCodeTableData = [];
  show_before_inout_in_promo_code = false;

  constructor(
    public datepipe: DatePipe,
    public formBuilder: FormBuilder,
    private venueService: VenueService,
    private eventsService: EventsService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.addEventForm = this.formBuilder.group({
      eventName: new FormControl("", Validators.compose([Validators.required])),
      eventDescription: new FormControl(""),
      eventAge: new FormControl(""),
      eventDate: new FormControl("", Validators.compose([Validators.required])),
      eventStartTime: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      eventEndTime: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      totalTickets: new FormControl(""),
      eventFee: new FormControl(""),
      venueId: new FormControl("", Validators.compose([Validators.required])),
      acceptCharge: new FormControl("")
    });

    this.addTicketForm = this.formBuilder.group({
      ticketType: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      ticketDescription: new FormControl(""),
      ticketCount: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      ticketFee: new FormControl("", Validators.compose([Validators.required])),
      ticketAvailableNumber: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      ticketAvailableSelect: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      ticketExpiry: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      ticketExpiryBeforeEventNumber: new FormControl(""),
      ticketExpiryBeforeEventSelect: new FormControl(""),
      ticketAvailableTime: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      ticketExpiryTime: new FormControl(
        "",
        Validators.compose([Validators.required])
      )
    });

    this.addPromoCodeForm = this.formBuilder.group({
      promoCode: new FormControl("", Validators.compose([Validators.required])),
      promoCodeDescription: new FormControl(""),
      promoCodeDiscount: new FormControl(""),
      promoCodeTicketType: new FormControl(""),
      promotionStartNumber: new FormControl(""),
      promotionSelect: new FormControl(""),
      promotionExpiry: new FormControl(""),
      promotionStartTime: new FormControl(""),
      promotionExpiryTime: new FormControl(""),
      promotionExpiryNumber: new FormControl(""),
      promotionExpirySelect: new FormControl("")
    });
  }
  getEventDate() {
    console.log(this.event_date);
  }

  getEventStartTime(event) {
    this.addEventForm.controls["eventStartTime"].setValue(
      this.datepipe.transform(event, "h:mm a")
    );
  }

  getEventEndTime(event) {
    this.addEventForm.controls["eventEndTime"].setValue(
      this.datepipe.transform(event, "h:mm a")
    );
  }

  getTicketStartTime(event) {
    this.addTicketForm.controls["ticketAvailableTime"].setValue(
      this.datepipe.transform(event, "h:mm a")
    );
  }
  getTicketExpiryTime(event) {
    this.addTicketForm.controls["ticketExpiryTime"].setValue(
      this.datepipe.transform(event, "h:mm a")
    );
  }

  getPromoExpiryTime(event) {
    this.addPromoCodeForm.controls["promotionExpiryTime"].setValue(
      this.datepipe.transform(event, "h:mm a")
    );
  }

  getPromoStartTime(event) {
    this.addPromoCodeForm.controls["promotionStartTime"].setValue(
      this.datepipe.transform(event, "h:mm a")
    );
  }

  onSelect(event) {
    console.log(event);
    this.imageFile.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.imageFile.splice(this.imageFile.indexOf(event), 1);
  }

  ngOnInit() {
    this.addEventForm.controls["eventStartTime"].setValue("01:00 AM");
    this.addEventForm.controls["eventEndTime"].setValue("02:00 AM");
    this.addEventForm.controls["eventFee"].setValue("0");
    this.addTicketForm.controls["ticketAvailableTime"].setValue("11:00 AM");
    this.addTicketForm.controls["ticketExpiryTime"].setValue("11:00 AM");
    this.addTicketForm.controls["ticketAvailableNumber"].setValue("8");
    this.addTicketForm.controls["ticketCount"].setValue("0");
    this.addTicketForm.controls["ticketFee"].setValue("0");
    this.addEventForm.controls["ticketExpiryBeforeEventNumber"].setValue("0");
    //this.addEventForm.controls["eventAge"].setValue("All");

    this.getVenueList();
    this.venueService.getVenuesDetails();
    this.gettingEventEditValues();
  }

  // convenience getter for easy access to form fields
  get inputValues() {
    return this.addEventForm.controls;
  }

  get inputValuesAddTicket() {
    return this.addTicketForm.controls;
  }

  get inputValueAddPromo() {
    return this.addPromoCodeForm.controls;
  }

  //getting venue list
  getVenueList() {
    this.venueListSubscription = this.venueService.$venueListObeservable.subscribe(
      data => {
        console.log(data);
        if (data != null) {
          this.venuesList = data;
          console.log(this.venuesList, "venue list data");
        }
      }
    );
  }

  //getting values for edit event

  parent_event_id;
  event_id: any;
  gettingEventEditValues() {
    if (this.router.url != "/add-event") {
      this.route.queryParams.subscribe((queryParam: any) => {
        if (queryParam) {
          this.event_id = queryParam["event_id"];
          this.eventsService.viewEventDetails(this.event_id).subscribe(data => {
            console.log(data, "for editing");
            let eventDetail = data.data[0];
            this.parent_event_id = eventDetail.parent_event_id;
            console.log(this.parent_event_id, "parent event id");
            this.addEventForm.controls["eventName"].setValue(
              eventDetail.event_name
            );
            this.addEventForm.controls["eventDescription"].setValue(
              eventDetail.event_description
            );
            //this.addEventForm.controls['eventDate'].setValue(eventDetail.event_date);
            this.event_date = eventDetail.event_date;
            this.addEventForm.controls["eventStartTime"].setValue(
              eventDetail.event_start_time
            );
            this.addEventForm.controls["eventEndTime"].setValue(
              eventDetail.event_end_time
            );
            this.addEventForm.controls["totalTickets"].setValue(
              eventDetail.event_tickets
            );
            this.addEventForm.controls["eventFee"].setValue(
              eventDetail.event_fee
            );
          });
        }
      });
    }
  }

  onSubmit() {
    if (this.addEventForm.valid) {
      if (this.router.url == "/add-event") {
        this.eventsService.addNewEvent(
          this.inputValues.venueId.value,
          this.inputValues.eventName.value,
          this.inputValues.eventDescription.value,
          21,
          this.inputValues.eventDate.value,
          this.inputValues.eventStartTime.value,
          this.inputValues.eventEndTime.value,
          //  this.inputValues.totalTickets.value,
          "220", // total tickets
          this.inputValues.eventFee.value
        );
      } else {
        this.eventsService
          .updateEvent(
            this.inputValues.venueId.value,
            this.inputValues.eventName.value,
            this.inputValues.eventDescription.value,
            this.inputValues.eventAge.value,
            this.inputValues.eventDate.value,
            this.inputValues.eventStartTime.value,
            this.inputValues.eventEndTime.value,
            this.inputValues.totalTickets.value,
            this.inputValues.eventFee.value,
            this.parent_event_id,
            this.event_id
          )
          .subscribe(data => {
            console.log(data);
          });
      }
    } else {
      alert("invalid form");
    }
  }

  //multiple date picker
  daysSelected: any[] = [];
  event: any;
  isSelected = (event: any) => {
    const date =
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "/" +
      ("00" + event.getDate()).slice(-2) +
      "/" +
      event.getFullYear();
    return this.daysSelected.find(x => x == date) ? "selected" : null;
  };

  select(event: any, calendar: any) {
    const date =
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "/" +
      ("00" + event.getDate()).slice(-2) +
      "/" +
      event.getFullYear();

    const index = this.daysSelected.findIndex(x => x == date);
    if (index < 0) this.daysSelected.push(date);
    else this.daysSelected.splice(index, 1);

    calendar.updateTodaysDate();
    var datesOfEvents = this.daysSelected.toString();
    this.addEventForm.controls["eventDate"].setValue(datesOfEvents);
  }

  onTicketRadio(value) {
    if (value == "beforeEvent") {
      this.show_before_input_in_add_ticket = true;
    } else if (value == "onEventDay") {
      this.show_before_input_in_add_ticket = false;
      this.addTicketForm.controls["ticketExpiryBeforeEventNumber"].setValue(
        "0"
      );
    }
  }
  onPromoCodeRadio(value) {
    if (value == "beforeEvent") {
      this.show_before_inout_in_promo_code = true;
    } else if (value == "onEventDay") {
      this.show_before_inout_in_promo_code = false;
      this.addPromoCodeForm.controls["promotionExpiryNumber"].setValue("0");
    }
  }

  objCheckedTicketTypeInPromocode = {};

  onTicketTypeAdd() {
    let duplicateNotExist = true;
    for (var i = 0; i < this.addTicketTableData.length; i++) {
      if (
        this.addTicketTableData[i].ticketType ==
        this.inputValuesAddTicket.ticketType.value
      ) {
        duplicateNotExist = false;
        alert("already exist");
      }
    }
    if (duplicateNotExist == true) {
      let ticketStartDays =
        this.inputValuesAddTicket.ticketAvailableNumber.value *
        this.inputValuesAddTicket.ticketAvailableSelect.value;

      let ticketExpireDay =
        this.inputValuesAddTicket.ticketExpiryBeforeEventNumber.value *
        this.inputValuesAddTicket.ticketExpiryBeforeEventSelect.value;

      var ticketObj = {
        ticketType: this.inputValuesAddTicket.ticketType.value,
        ticketDescription: this.inputValuesAddTicket.ticketDescription.value,
        ticketCount: this.inputValuesAddTicket.ticketCount.value,
        ticketFee: this.inputValuesAddTicket.ticketFee.value,
        startDays: ticketStartDays,
        ticketStartTime: this.inputValuesAddTicket.ticketAvailableTime.value,
        ticketExpiryTime: this.inputValuesAddTicket.ticketExpiryTime.value,
        expireDay: ticketExpireDay
      };
      this.addTicketTableData.push(ticketObj);
      this.objCheckedTicketTypeInPromocode[
        this.inputValuesAddTicket.ticketType.value
      ] = [];
      console.log(this.objCheckedTicketTypeInPromocode);
    }
  }

  deleteTicketType(type) {
    if (this.objCheckedTicketTypeInPromocode[type].length == 0) {
      for (var i = 0; i < this.addTicketTableData.length; i++) {
        if (this.addTicketTableData[i].ticketType == type) {
          this.addTicketTableData.splice(i, 1);
        }
      }
    } else {
      alert("it is checked in promo code");
    }

    return this.addTicketTableData;
  }

  onAddPromo() {
    //addPromoCodeTableData
    let duplicateNotExist = true;
    for (var i = 0; i < this.addPromoCodeTableData.length; i++) {
      if (
        this.addPromoCodeTableData[i].promoCode ==
        this.inputValueAddPromo.promoCode.value
      ) {
        duplicateNotExist = false;
        alert("already exist");
      }
    }
    if (duplicateNotExist == true) {
      let startDays =
        this.inputValueAddPromo.promotionStartNumber.value *
        this.inputValueAddPromo.promotionSelect.value;

      let expireDay =
        this.inputValueAddPromo.promotionExpiryNumber.value *
        this.inputValueAddPromo.promotionExpirySelect.value;

      var promoCodeObj = {
        promoCode: this.inputValueAddPromo.promoCode.value,
        promoCodeDescription: this.inputValueAddPromo.promoCodeDescription
          .value,
        promoCodeDiscount: this.inputValueAddPromo.promoCodeDiscount.value,
        promoStartDays: startDays,
        promoStartTime: this.inputValueAddPromo.promotionStartTime.value,
        expiryDay: expireDay,
        expiryTime: this.inputValueAddPromo.promotionExpiryTime.value
      };

      this.addPromoCodeTableData.push(promoCodeObj);

      for (var k = 0; k < this.ticketTypeCheckedArray.length; k++) {
        //obj["key3"] = "value3";
        this.objCheckedTicketTypeInPromocode[
          this.ticketTypeCheckedArray[k]
        ].push(this.inputValueAddPromo.promoCode.value);
      }
      console.log(this.objCheckedTicketTypeInPromocode);
    }
  }

  onDeletePromoCode(promoCodeValue) {
    for (var i = 0; i < this.addPromoCodeTableData.length; i++) {
      if (this.addPromoCodeTableData[i].promoCode == promoCodeValue) {
        this.addPromoCodeTableData.splice(i, 1);
      }
    }
    Object.keys(this.objCheckedTicketTypeInPromocode).forEach((key, index) => {
     // console.log(key + 'key here', this.objCheckedTicketTypeInPromocode[key] + 'value here');
     console.log(this.objCheckedTicketTypeInPromocode[key])
      for (var i = 0; i < this.objCheckedTicketTypeInPromocode[key].length; i++) {
      if (this.objCheckedTicketTypeInPromocode[key][i] == promoCodeValue) {
        this.objCheckedTicketTypeInPromocode[key].splice(i, 1);
      }
    }
    
    });
    console.log(this.objCheckedTicketTypeInPromocode)

    return this.addPromoCodeTableData;
  }

  ticketTypeCheckedArray = [];

  setCheckBoxLogic(event) {
    if (event.target.checked) {
      this.ticketTypeCheckedArray.push(event.target.value);
    } else if (event.target.checked == false) {
      for (var i = 0; i < this.ticketTypeCheckedArray.length; i++) {
        if (this.ticketTypeCheckedArray[i] == event.target.value) {
          this.ticketTypeCheckedArray.splice(i, 1);
        }
      }
    }
  }

  // onNextClickEventDetail(){
  //   this.firstCollapseOpened = false;
  //   this.secondCollapseOpened = true;
  // }
}
