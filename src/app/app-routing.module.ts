import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AccountSummaryComponent } from "./account-summary/account-summary.component";
import { UpcomingEventsComponent } from "./upcoming-events/upcoming-events.component";
import { PastEventsComponent } from "./past-events/past-events.component";
import { ViewEventComponent } from "./view-event/view-event.component";
import { ViewVenuesComponent } from "./view-venues/view-venues.component";
import { PromotersComponent } from "./promoters/promoters.component";
import { ViewVenueComponent } from "./view-venue/view-venue.component";
import { SigninComponent } from "./signin/signin.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { AddEventComponent } from "./add-event/add-event.component";
import { AddVenueComponent } from "./add-venue/add-venue.component";
import { RegisterComponent } from "./register/register.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { EditUserProfileComponent } from "./edit-user-profile/edit-user-profile.component";
import { NewsFeedComponent } from './news-feed/news-feed.component';



// Import canActivate guard services
import { AuthGuard } from "./guards/auth.guard";
import { SecureInnerPagesGuard } from "./guards/secure-inner-pages.guard";
import { WorkInProgressComponent } from "./work-in-progress/work-in-progress.component";
import { PostComponent } from "./post/post.component";


const routes: Routes = [
  { path: "", redirectTo: "/signin", pathMatch: "full" },
  {
    path: "account-summary",
    component: AccountSummaryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "upcoming-events",
    component: UpcomingEventsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "past-events",
    component: PastEventsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "view-event",
    component: ViewEventComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "view-venues",
    component: ViewVenuesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "promoters",
    component: PromotersComponent,
    canActivate: [AuthGuard]
  },
    {
    path: "news-feed",
    component: NewsFeedComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "view-venue",
    component: ViewVenueComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "user-profile",
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "edit-user-profile",
    component: EditUserProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "work-in-progress",
    component: WorkInProgressComponent,
    canActivate: [AuthGuard]
  },
  { path: "add-event", component: AddEventComponent, canActivate: [AuthGuard] },
  { path: "add-venue", component: AddVenueComponent, canActivate: [AuthGuard] },
  { path: "posts", component: PostComponent, canActivate: [AuthGuard] },

  {
    path: "signin",
    component: SigninComponent,
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent,
    canActivate: [SecureInnerPagesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
