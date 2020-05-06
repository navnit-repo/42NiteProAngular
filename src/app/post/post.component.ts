import { Component, OnInit, ViewChild, Input, AfterViewInit } from "@angular/core";
import { AuthUserService } from "../authUserService/auth-user.service";
import { VenueService } from "../services/venue.service";
import { PostsService } from "../services/posts.service";
import { PromoterVenuesService } from "../services/promoter-venues.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { async } from "@angular/core/testing";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"]
})
export class PostComponent implements OnInit {

  //loading 
  pageLoading = true;

  constructor(
    private venueService: VenueService,
    private postsService: PostsService,
    private promoterVenueService: PromoterVenuesService,
    public router: Router
  ) {}

  imageUploadOption = false;
  onImageUploadClick() {
    this.imageUploadOption = !this.imageUploadOption;
  }

  taggingOption = false;
  onTagClick() {
    this.taggingOption = !this.taggingOption;
  }

  ngOnInit() {
    this.subscribeVenueListData();
    this.venueService.getVenuesDetails(); 

  }



  //getting venue list and posts
  venuesList: any[];
  
  venueListSubscription: Subscription;
  venueListLength;

  public subscribeVenueListData() {
    this.venueListSubscription = this.venueService.$venueListObeservable.subscribe(
      data => {
        //this.venueService.dtTrigger.subscribe();
        if (data != null) {
          this.venuesList = data;
          this.venueListLength = data.length;
          // console.log(this.venuesList[0].venue_id,'venue id');
          //console.log(this.venuesList)
          this.venue_id = this.venuesList[0].venue_id;
          this.venueName = this.venuesList[0].venue_name;
          this.postsService.getUserPosts(this.venuesList[0].venue_id).subscribe(data => {
            this.postsList = data.data;
            this.pageLoading = false;
          })
          
        }
      }
    );
  }

  //getting  posts
  postsList: [];
  postsListSubscription: Subscription;
  venue_id;
  venueName;

  onSelectActiveProfile(venue_id) {
    console.log(venue_id)
    this.pageLoading = true;
    this.postsListSubscription = this.postsService
      .getUserPosts(venue_id)
      .subscribe(data => {
        this.postsList = data.data;
        this.venue_id = venue_id;
        this.pageLoading = false
  
        console.log(this.postsList, "on select list");

      });
  }

  getVenueName(venue_name) {
    console.log(venue_name,'nammmmeeee')
  }

 onSharePost(post_id) {
   console.log(post_id);
   this.postsService.sharePost(this.venue_id, post_id).subscribe(data => {
     if(data.status == "success") {
      this.subscribeVenueListData();
       console.log(data);
     }
   })
 }


  onPostLike(post_id) {
       console.log(post_id);
   this.postsService.likePost(this.venue_id, post_id).subscribe(data => {
     if(data.status == "success") {
      this.subscribeVenueListData();
       console.log(data)
     }
   })
  }

    //caraousel count
  gettingIndexes(image, array) {
    return array.indexOf(image) + 1;
  }

  gettingImagesLength(images) {
    return images.length;
  }

  //gettting posts comments
//  getComments(post_id) {
//    this.postsService.getPostComments(this.venue_id,post_id).subscribe((data) => {
//      return JSON.stringify(data);
//    })
//  }

 getPostId(post_id) {
   console.log(post_id,'here is post id')
 }

  //creating comment 
  onCreateComment(post_id,content) {
  console.log(content+' is comment and post_id is  '+post_id)
  this.postsService.createComment(this.venue_id,post_id,content).subscribe(data => {
    if(data.status="success") {
      console.log('comment created');
    } else {
      console.log(data)
    }
  })
  }

}
