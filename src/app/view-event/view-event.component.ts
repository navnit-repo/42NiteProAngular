
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Subscription } from "rxjs";
import { ViewEventService } from "./view-event.service";
import { Router, ActivatedRoute } from "@angular/router";
import { EventsService } from "../services/events.service";
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { map } from 'rxjs/operators';

@Component({
  selector: "app-view-event",
  templateUrl: "./view-event.component.html",
  styleUrls: ["./view-event.component.css"],
 // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewEventComponent implements OnInit {
  viewEvent: any;
  viewEventSubscription: Subscription;
  eventPictures: any;
  event_id;

  //past event images
  pastEventImages: [];
  imageLength;
  showImages: boolean = false;

  //image preview
  imagePreview = false;
  currentImage;
  imageIndex;

 
	


  constructor(
    private viewEventService: ViewEventService,
    private router: Router,
    private route: ActivatedRoute,
    private eventsService: EventsService,
    public gallery: Gallery, 
    public lightbox: Lightbox
  ) {}

  ngOnInit() {
    this.subscribeViewEvent();
    this.viewEventService.refreshViewEvent();
    

  }

  
  

  public subscribeViewEvent() {
    this.viewEventSubscription = this.route.queryParams.subscribe(
      (queryParam: any) => {
        console.log(queryParam, "router id", ".......", queryParam["event_id"]);

        this.event_id = queryParam["event_id"];
        this.eventsService.viewEventDetails(this.event_id).subscribe(data => {
          console.log(data.data, "here is ");
          this.viewEvent = data.data[0];
          let parent_event_id = this.viewEvent.parent_event_id;
          let venue_id = this.viewEvent.venue_id;

          console.log(parent_event_id, "paent event id");
          console.log(venue_id, "vnue id here");
          this.eventsService
            .getPastEventImages(this.event_id, parent_event_id, venue_id)
            .subscribe(data => {
              console.log(data, "event images");
              if (data.status == "success") {
                this.showImages = true;
                this.pastEventImages = data.data;
                this.imageLength = data.data.length;
              }
            });
        });
      }
    );
  }

  getEventImage() {
    if (this.viewEvent) {
      return this.viewEvent.event_pic;
    }
  }

  getEventName() {
    if (this.viewEvent) {
      return this.viewEvent.event_name;
    }
  }

  getEventDescription() {
    if (this.viewEvent) {
      return this.viewEvent.event_description;
    }
  }

  getVenueName() {
    if (this.viewEvent) {
      return this.viewEvent.organiser_name;
    }
  }

  getEventSeats() {
    if (this.viewEvent) {
      return this.viewEvent.event_tickets;
    }
  }

  getAgeGroup() {
    if (this.viewEvent) {
      return this.viewEvent.event_age_group;
    }
  }

  getEventDate() {
    if (this.viewEvent) {
      return this.viewEvent.event_date;
    }
  }

  getEventTime() {
    if (this.viewEvent) {
      return (
        this.viewEvent.event_start_time +
        " to " +
        this.viewEvent.event_start_time
      );
    }
  }

  private curImg;
  onImagePreviewClick(image, pastImages, url) {
    console.log(image);
    console.log(pastImages);
    console.log(url);
    this.curImg = pastImages;
    this.imageIndex = pastImages.findIndex(x => x.image_url === url);
    console.log(this.imageIndex, "index");
    this.imagePreview = true;
    this.currentImage = pastImages[this.imageIndex].image_url;
    console.log(this.currentImage,'current image')
  }

  onCloseImagePreview() {
    this.imagePreview = false;
  }

  onNextImage() {
    console.log(this.curImg);
    console.log(this.imageIndex);
    this.currentImage = this.curImg[this.imageIndex + 1].image_url;
  }

  onPrevImage() {
    this.currentImage = this.curImg[this.imageIndex - 1].image_url;
  }

}



