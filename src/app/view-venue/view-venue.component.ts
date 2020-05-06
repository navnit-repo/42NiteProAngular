import { Component, OnInit, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { ViewVenueService } from "./view-venue.service";
import { AuthUserService } from "../authUserService/auth-user.service";
import { VenueService } from "../services/venue.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { NgxImageGalleryComponent, GALLERY_IMAGE, GALLERY_CONF } from "ngx-image-gallery";

@Component({
  selector: "app-view-venue",
  templateUrl: "./view-venue.component.html",
  styleUrls: ["./view-venue.component.css"]
})
export class ViewVenueComponent implements OnInit {

  venue_id: any;
  viewVenueDetails: any;
  viewVenueDetailsSubscription: Subscription;
  userRole:any;

  //loading animations
  pageLoading:any;


  constructor(
    private viewVenueService: ViewVenueService,
    private authUserService: AuthUserService,
    private venueService: VenueService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.pageLoading = true;
    this.userRole = this.authUserService.user_role;
    console.log(this.userRole);
    this.viewVenueDetailsSubscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        console.log(queryParam, "router id");
        this.venue_id = queryParam["venue_id"];
        this.venueService.viewOneVenue(this.venue_id).subscribe(data => {
          this.pageLoading = false;
          this.viewVenueDetails = data.data
        })
      }
    );
  }

  

  getVenueName() {
    if (this.viewVenueDetails) {
      return this.viewVenueDetails.venue_name;
    } 
  }

  getVenueDescription() {
    if (this.viewVenueDetails) {
      return this.viewVenueDetails.description;
    }
  }

  getVenueEmail() {
    if (this.viewVenueDetails) {
      return this.viewVenueDetails.email;
    }
  }

  getVenueAddress() {
    if (this.viewVenueDetails) {
      return this.viewVenueDetails.address;
    }
  }

  getVenueCity() {
    if (this.viewVenueDetails) {
      return this.viewVenueDetails.city;
    }
  }

  getVenueCountry() {
    if (this.viewVenueDetails) {
      return this.viewVenueDetails.country;
    }
  }

  getVenueZipCode() {
    if (this.viewVenueDetails) {
      return this.viewVenueDetails.zip_code;
    }
  }

  getVenueContactNumber() {
    if (this.viewVenueDetails) {
      return this.viewVenueDetails.phone_no;
    }
  }

  //opening time
  getMondayOpeningTime() {
    if (this.viewVenueDetails.opening_hours.monday.opening != "") {
      return this.viewVenueDetails.opening_hours.monday.opening;
    } else {
      return "Closed";
    }
  }

  getTuesdayOpeningTime() {
    if (this.viewVenueDetails.opening_hours.tuesday.opening != "") {
      return this.viewVenueDetails.opening_hours.tuesday.opening;
    } else {
      return "Closed";
    }
  }

  getWednesdayOpeningTime() {
    if (this.viewVenueDetails.opening_hours.wednesday.opening != "") {
      return this.viewVenueDetails.opening_hours.wednesday.opening;
    } else {
      return "Closed";
    }
  }

  getThursdayOpeningTime() {
    if (this.viewVenueDetails.opening_hours.thursday.opening != "") {
      return this.viewVenueDetails.opening_hours.thursday.opening;
    } else {
      return "Closed";
    }
  }

  getFridayOpeningTime() {
    if (this.viewVenueDetails.opening_hours.friday.opening != "") {
      return this.viewVenueDetails.opening_hours.friday.opening;
    } else {
      return "Closed";
    }
  }

  getSaturdayOpeningTime() {
    if (this.viewVenueDetails.opening_hours.saturday.opening != "") {
      return this.viewVenueDetails.opening_hours.saturday.opening;
    } else {
      return "Closed";
    }
  }

  getSundayOpeningTime() {
    if (this.viewVenueDetails.opening_hours.sunday.opening != "") {
      return this.viewVenueDetails.opening_hours.sunday.opening;
    } else {
      return "Closed";
    }
  }

  //closing time
  getMondayClosingTime() {
    if (this.viewVenueDetails.opening_hours.monday.closing != "") {
      return this.viewVenueDetails.opening_hours.monday.closing;
    } else {
      return "Closed";
    }
  }

  getTuesdayClosingTime() {
    if (this.viewVenueDetails.opening_hours.tuesday.closing != "") {
      return this.viewVenueDetails.opening_hours.tuesday.closing;
    } else {
      return "Closed";
    }
  }

  getWednesdayClosingTime() {
    if (this.viewVenueDetails.opening_hours.wednesday.closing != "") {
      return this.viewVenueDetails.opening_hours.wednesday.closing;
    } else {
      return "Closed";
    }
  }

  getThursdayClosingTime() {
    if (this.viewVenueDetails.opening_hours.thursday.closing != "") {
      return this.viewVenueDetails.opening_hours.thursday.closing;
    } else {
      return "Closed";
    }
  }

  getFridayClosingTime() {
    if (this.viewVenueDetails.opening_hours.friday.closing != "") {
      return this.viewVenueDetails.opening_hours.friday.closing;
    } else {
      return "Closed";
    }
  }

  getSaturdayClosingTime() {
    if (this.viewVenueDetails.opening_hours.saturday.closing != "") {
      return this.viewVenueDetails.opening_hours.saturday.closing;
    } else {
      return "Closed";
    }
  }

  getSundayClosingTime() {
    if (this.viewVenueDetails.opening_hours.sunday.closing != "") {
      return this.viewVenueDetails.opening_hours.sunday.closing;
    } else {
      return "Closed";
    }
  }


  //gallery

   // get reference to gallery component
  @ViewChild(NgxImageGalleryComponent) ngxImageGallery: NgxImageGalleryComponent;
  
  // gallery configuration
  conf: GALLERY_CONF = {
    imageOffset: '0px',
    showDeleteControl: false,
    showImageTitle: false,
  };
    
  // gallery images
  images: GALLERY_IMAGE[] = [
    {
      url: "https://picsum.photos/200/300", 
      altText: 'woman-in-black-blazer-holding-blue-cup', 
      title: 'woman-in-black-blazer-holding-blue-cup',
      thumbnailUrl: "https://picsum.photos/200/300"
    },
    {
       url: "https://picsum.photos/200/300", 
      altText: 'two-woman-standing-on-the-ground-and-staring-at-the-mountain', 
      extUrl: 'https://picsum.photos/200/300',
      thumbnailUrl: "https://picsum.photos/200/300"
    },
  ];

    
  // METHODS
  // open gallery
  openGallery(index: number = 0) {
    this.ngxImageGallery.open(index);
  }
    
  // close gallery
  closeGallery() {
    this.ngxImageGallery.close();
  }
    
  // set new active(visible) image in gallery
  newImage(index: number = 0) {
    this.ngxImageGallery.setActiveImage(index);
  }
    
  // next image in gallery
  nextImage(index: number = 0) {
    this.ngxImageGallery.next();
  }
    
  // prev image in gallery
  prevImage(index: number = 0) {
    this.ngxImageGallery.prev();
  }
    
  /**************************************************/
    
  // EVENTS
  // callback on gallery opened
  galleryOpened(index) {
    console.info('Gallery opened at index ', index);
  }
 
  // callback on gallery closed
  galleryClosed() {
    console.info('Gallery closed.');
  }
 
  // callback on gallery image clicked
  galleryImageClicked(index) {
    console.info('Gallery image clicked with index ', index);
  }
  
  // callback on gallery image changed
  galleryImageChanged(index) {
    console.info('Gallery image changed to index ', index);
  }
 
  // callback on user clicked delete button
  deleteImage(index) {
    console.info('Delete image at index ', index);
  }
}


