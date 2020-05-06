//Modules
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxDropzoneModule } from "ngx-dropzone";
import { DropzoneModule, DropzoneConfigInterface,
  DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { NgSelectModule } from "@ng-select/ng-select";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AgmCoreModule } from "@agm/core";
import { NgxPaginationModule } from "ngx-pagination";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { PopoverModule } from "ngx-bootstrap/popover";
import { DatePipe } from "@angular/common";

import { DataTablesModule } from 'angular-datatables';
import { MaterialModule } from './material.module';

// image gallery
import 'hammerjs';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { NgxImageGalleryModule } from 'ngx-image-gallery';




//Components
import { AppComponent } from "./app.component";
import { MarqueeHeaderComponent } from "./marqueeHeader/marqueeHeader.component";
import { SideBarMenuComponent } from "./side-bar-menu/side-bar-menu.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { AccountSummaryComponent } from "./account-summary/account-summary.component";
import { PastEventsComponent } from "./past-events/past-events.component";
import { UpcomingEventsComponent } from "./upcoming-events/upcoming-events.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { EventsComponent } from "./events/events.component";
import { ViewEventComponent } from "./view-event/view-event.component";
import { ViewVenuesComponent } from "./view-venues/view-venues.component";
import { PromotersComponent } from "./promoters/promoters.component";
import { ViewVenueComponent } from "./view-venue/view-venue.component";
import { SigninComponent } from "./signin/signin.component";
import { AddEventComponent } from "./add-event/add-event.component";
import { AddVenueComponent } from "./add-venue/add-venue.component";
import { RegisterComponent } from "./register/register.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { PostComponent } from "./post/post.component";
import { EditUserProfileComponent } from "./edit-user-profile/edit-user-profile.component";
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';

//Services
import { AuthUserService } from "./authUserService/auth-user.service";
import { UserProfileService } from "./user-profile/user-profile.service";
import { EventsService } from './services/events.service';
import { PromoterService } from './services/promoter.service';
import { PostsService } from './services/posts.service';
import { VenueService } from "./services/venue.service";
import { PromoterVenuesService } from './services/promoter-venues.service';

//Guards
import { SecureInnerPagesGuard } from "./guards/secure-inner-pages.guard";
import { AuthGuard } from "./guards/auth.guard";



const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  acceptedFiles: 'image/*',
  createImageThumbnails: true
};

@NgModule({
  declarations: [
    AppComponent,
    MarqueeHeaderComponent,
    SideBarMenuComponent,
    UserProfileComponent,
    AccountSummaryComponent,
    PastEventsComponent,
    UpcomingEventsComponent,
    BreadcrumbComponent,
    EventsComponent,
    ViewEventComponent,
    ViewVenuesComponent,
    PromotersComponent,
    ViewVenueComponent,
    SigninComponent,
    AddEventComponent,
    AddVenueComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    EditUserProfileComponent,
    PostComponent,
    WorkInProgressComponent,
    NewsFeedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    NgxDropzoneModule,
    DropzoneModule,
    GooglePlaceModule,
    NgxPaginationModule,
    GalleryModule,
    LightboxModule,
    DataTablesModule,
    MaterialModule,
    NgxImageGalleryModule,
    TimepickerModule.forRoot(),
    PopoverModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCttfuLA9fAAIGgNlsl3AzXU2NWbpmx62E",
      libraries: ["places"]
    })
  ],
  providers: [
    UserProfileService,
    AuthUserService,
    SecureInnerPagesGuard,
    AuthGuard,
    VenueService,
    DatePipe,
    PromoterVenuesService,
    EventsService,
    PromoterService,
    PostsService,
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule {}
