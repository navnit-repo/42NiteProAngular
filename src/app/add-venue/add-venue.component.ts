import {
  Component,
  ViewChild,
  EventEmitter,
  OnInit,
  Directive,
  AfterViewInit,
  Input
} from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthUserService } from "../authUserService/auth-user.service";
import { VenueService } from "../services/venue.service";
import { Subscription } from "rxjs";
/// <reference types="@types/googlemaps" />

import {} from "googlemaps";
import { DatePipe } from "@angular/common";
import { GooglePlaceDirective } from "ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive";
import {
  NgxDropzoneComponent,
  NgxDropzonePreviewComponent,
  NgxDropzoneImagePreviewComponent
} from "ngx-dropzone";
import { GoogleMap } from "@agm/core/services/google-maps-types";
import { DropzoneModule, DropzoneConfig } from "ngx-dropzone-wrapper";

import {
  DropzoneComponent,
  DropzoneDirective,
  DropzoneConfigInterface
} from "ngx-dropzone-wrapper";

declare let google: any;

@Component({
  selector: "app-add-venue",
  templateUrl: "./add-venue.component.html",
  styleUrls: ["./add-venue.component.css"]
})
export class AddVenueComponent implements OnInit {
  google: any;

  //User Data
  user_id: number;
  currentUser: any;
  currentUserSubscription: Subscription;

  //Assigning google map to in variables
  venueState: string;
  latitude: any;
  longitude: any;
  zoom;

  //add venue form
  addVenueForm: FormGroup;
  addVenueScheduleForm: FormGroup;
  timepickerVisible = false;
  is_submitted = false;

  mondayOpeningTime: Date;
  monOpenTime;

  //loadings
  pageLoading;

  //methods for getting time from time picker
  getMondayOpeningTime(event) {
    console.log(this.datepipe.transform(event, "h:mm a"), "monday open");
    return (this.opening_schedule.monday.opening = this.datepipe.transform(
      event,
      "h:mm a"
    ));
  }

  getMondayClosingTime(event) {
    console.log(this.datepipe.transform(event, "h:mm a"), "monday close");
    return (this.opening_schedule.monday.closing = this.datepipe.transform(
      event,
      "h:mm a"
    ));
  }

  getTuesdayOpeningTime(event) {
    console.log(this.datepipe.transform(event, "h:mm a"), "tuesday open");
    return (this.opening_schedule.tuesday.opening = this.datepipe.transform(
      event,
      "h:mm a"
    ));
  }

  getTuesdayClosingime(event) {
    console.log(this.datepipe.transform(event, "h:mm a"), "tuesday close");
    return (this.opening_schedule.tuesday.closing = this.datepipe.transform(
      event,
      "h:mm a"
    ));
  }

  getWednesdayOpeningTime(event) {
    console.log(this.datepipe.transform(event, "h:mm a"), "wed open");
    return (this.opening_schedule.wednesday.opening = this.datepipe.transform(
      event,
      "h:mm a"
    ));
  }

  getWednesdayClosingTime(event) {
    console.log(this.datepipe.transform(event, "h:mm a"), "wed closing");
    return (this.opening_schedule.wednesday.closing = this.datepipe.transform(
      event,
      "h:mm a"
    ));
  }

  getThursdayOpeningTime(event) {
    console.log(this.datepipe.transform(event, "h:mm a"), "thursday opening");
    return (this.opening_schedule.thursday.opening = this.datepipe.transform(
      event,
      "h:mm a"
    ));
  }

  getThursdayClosingTime(event) {
    console.log(this.datepipe.transform(event, "h:mm a"), "thursday close");
    return (this.opening_schedule.thursday.closing = this.datepipe.transform(
      event,
      "h:mm a"
    ));
  }

  getFridayOpeningTime(event) {
    console.log(this.datepipe.transform(event, "h:mm a"), "friday opening");
    return (this.opening_schedule.friday.opening = this.datepipe.transform(
      event,
      "h:mm a"
    ));
  }

  getFridayClosingTime(event) {
    console.log(this.datepipe.transform(event, "h:mm a"), "friday closing");
    return (this.opening_schedule.friday.closing = this.datepipe.transform(
      event,
      "h:mm a"
    ));
  }

  getSaturdayOpeningTime(event) {
    console.log(this.datepipe.transform(event, "h:mm a"), "sat open");
    return (this.opening_schedule.saturday.opening = this.datepipe.transform(
      event,
      "h:mm a"
    ));
  }

  getSaturdayClosingTime(event) {
    console.log(this.datepipe.transform(event, "h:mm a"), "sat close");
    return (this.opening_schedule.saturday.closing = this.datepipe.transform(
      event,
      "h:mm a"
    ));
  }

  getSundayOpeningTime(event) {
    console.log(this.datepipe.transform(event, "h:mm a"), "sun open");
    return (this.opening_schedule.sunday.opening = this.datepipe.transform(
      event,
      "h:mm a"
    ));
  }

  getSundayClosingTime(event) {
    console.log(this.datepipe.transform(event, "h:mm a"), "sun close");
    return (this.opening_schedule.sunday.closing = this.datepipe.transform(
      event,
      "h:mm a"
    ));
  }

  opening_schedule = {
    monday: {
      opening: "01:00 AM",
      closing: "02:00 AM",
      is_closed: 0
    },
    tuesday: {
      opening: "01:00 AM",
      closing: "02:00 AM",
      is_closed: 0
    },
    wednesday: {
      opening: "01:00 AM",
      closing: "02:00 AM",
      is_closed: 0
    },
    thursday: {
      opening: "01:00 AM",
      closing: "02:00 AM",
      is_closed: 0
    },
    friday: {
      opening: "01:00 AM",
      closing: "02:00 AM",
      is_closed: 0
    },
    saturday: {
      opening: "01:00 AM",
      closing: "02:00 AM",
      is_closed: 0
    },
    sunday: {
      opening: "01:00 AM",
      closing: "02:00 AM",
      is_closed: 0
    }
  };

  constructor(
    public formBuilder: FormBuilder,
    private authUserService: AuthUserService,
    private venueService: VenueService,
    public datepipe: DatePipe,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.addVenueForm = this.formBuilder.group({
      venueName: new FormControl("", Validators.compose([Validators.required])),
      venueDescription: new FormControl(""),
      venueEmail: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-z0-9*._-]+@[a-z0-9.-]+.[a-z]{2,4}$")
        ])
      ),

      contactNumber: new FormControl(
        "",
        Validators.compose([
          Validators.required
          // Validators.pattern("^[0-9]*$")
        ])
      ),

      venueType: new FormControl("", Validators.compose([Validators.required])),
      venueAddress: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      venueCity: new FormControl("", Validators.compose([Validators.required])),
      venueCountry: new FormControl(
        "",
        Validators.compose([Validators.required])
      ),
      venueZipCode: new FormControl(""),
      monday_opening: new FormControl({
        value: "",
        disabled: this.mondayClose
      }),
      monday_closing: new FormControl(""),
      monday_is_closed: new FormControl(""),

      same_for_all_weeks: new FormControl(""),

      tuesday_opening: new FormControl(""),
      tuesday_closing: new FormControl(""),
      tuesday_is_closed: new FormControl(""),

      wednesday_opening: new FormControl(""),
      wednesday_closing: new FormControl(""),
      wednesday_is_closed: new FormControl(""),

      thursday_opening: new FormControl(""),
      thursday_closing: new FormControl(""),
      thursday_is_closed: new FormControl(""),

      friday_opening: new FormControl(""),
      friday_closing: new FormControl(""),
      friday_is_closed: new FormControl(""),

      saturday_opening: new FormControl(""),
      saturday_closing: new FormControl(""),
      saturday_is_closed: new FormControl(""),

      sunday_opening: new FormControl(""),
      sunday_closing: new FormControl(""),
      sunday_is_closed: new FormControl(""),

      //For Open Time Picker
      mondayOpenDatePicker: new FormControl(""),
      tuesdayOpenDatePicker: new FormControl(""),
      wednesdayOpenDatePicker: new FormControl(""),
      thursdayOpenDatePicker: new FormControl(""),
      fridayOpenDatePicker: new FormControl(""),
      saturdayOpenDatePicker: new FormControl(""),
      sundayOpenDatePicker: new FormControl(""),

      //For Closing Time Picker
      mondayCloseDatePicker: new FormControl(""),
      tuesdayCloseDatePicker: new FormControl(""),
      wednesdayCloseDatePicker: new FormControl(""),
      thursdayCloseDatePicker: new FormControl(""),
      fridayCloseDatePicker: new FormControl(""),
      saturdayCloseDatePicker: new FormControl(""),
      sundayCloseDatePicker: new FormControl(""),

      //for imageFile
      imageFile: new FormControl(""),
      imageFileSource: new FormControl("")
    });
  }

  public venue_id: any;
  ngOnInit() {
    this.locationTabActive = true;
    this.currentUserSubscription = this.authUserService.currentUser.subscribe(
      user => {
        this.user_id = user.data.user_id;
      }
    );
    this.setCurrentLocation();
    this.gettingVenueValues();
    console.log(this.router.url, "router url");
  }

  //getting values for venues when user wanna edit existing venue
  gettingVenueValues() {
    if (this.router.url != "/add-venue") {
      this.route.queryParams.subscribe((queryParam: any) => {
        if (queryParam) {
          this.pageLoading = true;
          console.log(queryParam, "router id");
          this.venue_id = queryParam["venue_id"];
          this.venueService.viewOneVenue(this.venue_id).subscribe(data => {
            console.log(data.data);
            this.pageLoading = false;
            let venueDetails = data.data;
            this.addVenueForm.controls["venueName"].setValue(
              venueDetails.venue_name
            );
            this.addVenueForm.controls["venueEmail"].setValue(
              venueDetails.email
            );
            this.addVenueForm.controls["contactNumber"].setValue(
              venueDetails.phone_no
            );
            this.addVenueForm.controls["venueType"].setValue(
              venueDetails.venue_type,
              { onlySelf: true }
            );
            this.addVenueForm.controls["venueDescription"].setValue(
              venueDetails.description
            );
            this.addVenueForm.controls["venueAddress"].setValue(
              venueDetails.address
            );
            this.addVenueForm.controls["venueCity"].setValue(venueDetails.city);
            this.addVenueForm.controls["venueCountry"].setValue(
              venueDetails.country
            );
            this.addVenueForm.controls["venueZipCode"].setValue(
              venueDetails.zip_code
            );
            //For Schedule Values
            this.opening_schedule = venueDetails.opening_hours;

            //location
            this.latitude = venueDetails.latitude;
            this.longitude = venueDetails.longitude;
            this.venueState = venueDetails.state;
            //console.log(this.latitude,'latitide');

            this.imageFile = venueDetails.profile_images;
            console.log(this.imageFile, "update image");

           // var reader = new FileReader();
          });
        }
      });
    }
  }

  //Code for tabs

  scheduleTabActive = false;
  locationTabActive = false;
  imageTabActive = false;

  onNextClick() {
    this.is_submitted = true;
    if (this.locationTabActive == true && this.addVenueForm.valid) {
      this.locationTabActive = false;
      this.scheduleTabActive = true;
      this.imageTabActive = false;
    } else if (this.scheduleTabActive == true) {
      this.locationTabActive = false;
      this.scheduleTabActive = false;
      this.imageTabActive = true;
    }
  }

  onPrevClick() {
    if (this.imageTabActive == true) {
      this.locationTabActive = false;
      this.scheduleTabActive = true;
      this.imageTabActive = false;
    } else if (this.scheduleTabActive == true) {
      this.locationTabActive = true;
      this.scheduleTabActive = false;
      this.imageTabActive = false;
    }
  }

  onLocationTabClick() {
    this.locationTabActive = true;
    this.scheduleTabActive = false;
    this.imageTabActive = false;
  }

  onScheduleClick() {
    this.is_submitted = true;

    if (this.addVenueForm.valid) {
      this.locationTabActive = false;
      this.scheduleTabActive = true;
      this.imageTabActive = false;
    }
  }
  onVenueImageClick() {
    this.is_submitted = true;
    if (this.addVenueForm.valid) {
      this.locationTabActive = false;
      this.scheduleTabActive = false;
      this.imageTabActive = true;
    }
  }

  //Methods to add and remove image dropzone
  imageFile: File[] = [];
  // @ViewChild("DropzoneComponent") componentRef: DropzoneComponent;

  onSelect(event) {
    console.log(event);
    this.imageFile.push(...event.addedFiles);
    console.log(this.imageFile);
  }

  onRemove(event) {
    console.log(event);
    this.imageFile.splice(this.imageFile.indexOf(event), 1);
  }

  //Google Map AutoComplete Methods
  @ViewChild("placesRef") placesRef: GooglePlaceDirective;

  public handleAddressChange(address: any) {
    console.log(address);
    if (address.name) {
      this.addVenueForm.controls["venueName"].setValue(address.name);
    }

    this.addVenueForm.controls["venueAddress"].setValue(
      address.formatted_address
    );
    this.addVenueForm.controls["venueCity"].setValue(
      address.address_components[0].long_name
    );

    if (address.address_components[3].long_name) {
      this.addVenueForm.controls["venueCountry"].setValue(
        address.address_components[3].long_name
      );
    }

    this.latitude = address.geometry.location.lat();
    this.longitude = address.geometry.location.lng();
    this.zoom = 15;
    console.log(this.latitude, "lat");
    this.venueState = address.address_components[2].long_name;
    console.log(this.inputValues.venueCity.value);
    console.log(this.inputValues.venueCountry.value);
    console.log(this.inputValues.venueAddress.value);
  }

  // convenience getter for easy access to form fields
  get inputValues() {
    return this.addVenueForm.controls;
  }

  //On Form Submission
  onSubmit() {
    this.is_submitted = true;
    if (this.addVenueForm.valid) {
      if (this.router.url == "/add-venue") {
        this.venueService
          .addVenue(
            this.user_id,
            this.inputValues.venueName.value,
            this.inputValues.venueDescription.value,
            this.inputValues.venueEmail.value,
            this.latitude,
            this.longitude,
            this.inputValues.contactNumber.value,
            this.inputValues.venueType.value,
            this.inputValues.venueAddress.value,
            this.inputValues.venueCity.value,
            this.inputValues.venueCountry.value,
            this.inputValues.venueZipCode.value,
            this.venueState,
            this.opening_schedule,
            this.imageFile
          )
          .subscribe(data => {
            this.router.navigate(["view-venues"]);
          });
      } else {
        console.log("updating");
        this.venueService
          .updateVenue(
            this.venue_id,
            this.inputValues.venueName.value,
            this.inputValues.venueDescription.value,
            this.inputValues.venueEmail.value,
            this.latitude,
            this.longitude,
            this.inputValues.contactNumber.value,
            this.inputValues.venueType.value,
            this.inputValues.venueAddress.value,
            this.inputValues.venueCity.value,
            this.inputValues.venueCountry.value,
            this.inputValues.venueZipCode.value,
            this.venueState,
            this.opening_schedule
          )
          .subscribe(data => {
            console.log(data);
            this.router.navigate(["view-venues"]);
          });
      }
    } else {
      console.log("invalid form");
    }
  }

  // Get Current Location Coordinates

  private setCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }
  private exportTime = { hour: 7, minute: 15, meriden: "PM", format: 24 };

  onChangeHour(event) {
    console.log("event", event);
  }

  mondayClose = false;
  checkboxModay(event) {
    if (this.mondayClose == true) {
      this.opening_schedule.monday.opening = "";
      this.opening_schedule.monday.closing = "";
      this.addVenueForm.controls["monday_opening"].disable();
      this.addVenueForm.controls["monday_closing"].disable();
    } else {
      this.addVenueForm.controls["monday_opening"].enable();
      this.addVenueForm.controls["monday_closing"].enable();
      this.opening_schedule.monday.opening = "01:00 AM";
      this.opening_schedule.monday.closing = "02:00 AM";
    }
  }

  tuesdayClose = false;
  checkboxTuesday(event) {
    if (this.tuesdayClose == true) {
      this.opening_schedule.tuesday.opening = "";
      this.opening_schedule.tuesday.closing = "";
      this.addVenueForm.controls["tuesday_opening"].disable();
      this.addVenueForm.controls["tuesday_closing"].disable();
    } else {
      this.addVenueForm.controls["tuesday_opening"].enable();
      this.addVenueForm.controls["tuesday_closing"].enable();
      this.opening_schedule.tuesday.opening = "01:00 AM";
      this.opening_schedule.tuesday.closing = "01:00 AM";
    }
  }

  wednesdayClose = false;
  checkboxWednesday(event) {
    if (this.wednesdayClose == true) {
      this.opening_schedule.wednesday.opening = "";
      this.opening_schedule.wednesday.closing = "";
      this.addVenueForm.controls["wednesday_opening"].disable();
      this.addVenueForm.controls["wednesday_closing"].disable();
    } else {
      this.addVenueForm.controls["wednesday_opening"].enable();
      this.addVenueForm.controls["wednesday_closing"].enable();
      this.opening_schedule.wednesday.opening = "01:00 AM";
      this.opening_schedule.wednesday.closing = "02:00 AM";
    }
  }

  thursdayClose = false;
  checkboxThursday(event) {
    if (this.thursdayClose == true) {
      this.opening_schedule.thursday.opening = "";
      this.opening_schedule.thursday.closing = "";
      this.addVenueForm.controls["thursday_opening"].disable();
      this.addVenueForm.controls["thursday_closing"].disable();
    } else {
      this.addVenueForm.controls["thursday_opening"].enable();
      this.addVenueForm.controls["thursday_closing"].enable();
      this.opening_schedule.thursday.opening = "01:00 AM";
      this.opening_schedule.thursday.closing = "02:00 AM";
    }
  }

  fridayClose = false;
  checkboxFriday(event) {
    if (this.fridayClose == true) {
      this.opening_schedule.friday.opening = "";
      this.opening_schedule.friday.closing = "";
      this.addVenueForm.controls["friday_opening"].disable();
      this.addVenueForm.controls["friday_closing"].disable();
    } else {
      this.addVenueForm.controls["friday_opening"].enable();
      this.addVenueForm.controls["friday_closing"].enable();
      this.opening_schedule.friday.opening = "01:00 AM";
      this.opening_schedule.friday.closing = "02:00 AM";
    }
  }

  saturdayClose = false;
  checkboxSaturday(event) {
    if (this.saturdayClose == true) {
      this.opening_schedule.saturday.opening = "";
      this.opening_schedule.saturday.closing = "";
      this.addVenueForm.controls["saturday_opening"].disable();
      this.addVenueForm.controls["saturday_closing"].disable();
    } else {
      this.addVenueForm.controls["saturday_opening"].enable();
      this.addVenueForm.controls["saturday_closing"].enable();
      this.opening_schedule.saturday.opening = "01:00 AM";
      this.opening_schedule.saturday.closing = "02:00 AM";
    }
  }

  sundayClose = false;
  checkboxSunday(event) {
    if (this.sundayClose == true) {
      this.opening_schedule.sunday.opening = "";
      this.opening_schedule.sunday.closing = "";
      this.addVenueForm.controls["sunday_opening"].disable();
      this.addVenueForm.controls["sunday_closing"].disable();
    } else {
      this.addVenueForm.controls["sunday_opening"].enable();
      this.addVenueForm.controls["sunday_closing"].enable();
      this.opening_schedule.sunday.opening = "01:00 AM";
      this.opening_schedule.sunday.closing = "02:00 AM";
    }
  }

  sameForAll = false;
  sameForAllWeeks(event) {
    if (this.sameForAll == true) {
      //opening
      this.opening_schedule.tuesday.opening = this.opening_schedule.monday.opening;
      this.opening_schedule.wednesday.opening = this.opening_schedule.monday.opening;
      this.opening_schedule.thursday.opening = this.opening_schedule.monday.opening;
      this.opening_schedule.friday.opening = this.opening_schedule.monday.opening;

      //friday_closing
      this.opening_schedule.tuesday.closing = this.opening_schedule.monday.closing;
      this.opening_schedule.wednesday.closing = this.opening_schedule.monday.closing;
      this.opening_schedule.thursday.closing = this.opening_schedule.monday.closing;
      this.opening_schedule.friday.closing = this.opening_schedule.monday.closing;
    } else {
      //opening
      this.opening_schedule.tuesday.opening = this.opening_schedule.tuesday.opening;
      this.opening_schedule.wednesday.opening = this.opening_schedule.wednesday.opening;
      this.opening_schedule.thursday.opening = this.opening_schedule.thursday.opening;
      this.opening_schedule.friday.opening = this.opening_schedule.friday.opening;

      //friday_closing
      this.opening_schedule.tuesday.closing = this.opening_schedule.tuesday.closing;
      this.opening_schedule.wednesday.closing = this.opening_schedule.wednesday.closing;
      this.opening_schedule.thursday.closing = this.opening_schedule.thursday.closing;
      this.opening_schedule.friday.closing = this.opening_schedule.friday.closing;
    }
  }
}
