import { Component, OnInit } from "@angular/core";
import { MarqueeHeaderService } from "./marqueeHeader.service";
import { Subscription } from "rxjs";
import { MarqueeContent } from "./marquee.interface";
@Component({
  selector: "app-marquee-header",
  templateUrl: "./marqueeHeader.component.html",
  styleUrls: ["./marqueeHeader.component.css"]
})
export class MarqueeHeaderComponent implements OnInit {
  marqueeContent: any;
  bodyTag: any;

  marqueeDataSubscription: Subscription;
  constructor(private sidebarService: MarqueeHeaderService) {}

  ngOnInit() {
    this.subscribeMarqueData();
    this.sidebarService.refershMarqueContent();
  }

  public subscribeMarqueData() {
    this.marqueeDataSubscription = this.sidebarService.$marqueObservable.subscribe(
      data => {
        if (data != null) {
          this.marqueeContent = data;
          // console.log(data.followers);
          // console.log(this.marqueeContent, " marquee content");
        }
      }
    );
  }

  onMenuClick() {
    this.bodyTag = document.getElementsByTagName("body")[0];
    let classCheck = this.bodyTag.classList[2];
    if (screen.width > 768) {
      if (classCheck == "page-sidebar-minimize") {
        this.bodyTag.classList.remove("page-sidebar-minimize");
      } else if (classCheck == undefined) {
        this.bodyTag.classList.add("page-sidebar-minimize");
      }
    }
   // page-sidebar-left-show for mobile devices
    if(screen.width < 768){
       if (classCheck == "page-sidebar-left-show") {
        this.bodyTag.classList.remove("page-sidebar-left-show");
      } else if (classCheck == undefined) {
        this.bodyTag.classList.add("page-sidebar-left-show");
      }
    }
  }

  getFollowerCount() {
    if (this.marqueeContent) {
      return this.marqueeContent.followers.followers_count;
    } else {
      return "0";
    }
  }
  getFollowersRate() {
    if (this.marqueeContent) {
      return this.marqueeContent.followers.followers_rate;
    } else {
      return "0";
    }
  }

  getRatingCount() {
    if (this.marqueeContent) {
      return this.marqueeContent.rating.rating_count;
    } else {
      return "0";
    }
  }
  getRatingRate() {
    if (this.marqueeContent) {
      return this.marqueeContent.rating.rating_rate;
    } else {
      return "0";
    }
  }

  getPageReachCount() {
    if (this.marqueeContent) {
      return this.marqueeContent.page_reach.page_reach_count;
    } else {
      return "0";
    }
  }
  getPageReachRate() {
    if (this.marqueeContent) {
      return this.marqueeContent.page_reach.page_reach_rate;
    } else {
      return "0";
    }
  }

  getEventsCount() {
    if (this.marqueeContent) {
      return this.marqueeContent.events.events_count;
    } else {
      return "0";
    }
  }
  getEventsRate() {
    if (this.marqueeContent) {
      return this.marqueeContent.events.events_rate;
    } else {
      return "0";
    }
  }

  getEventsReachCount() {
    if (this.marqueeContent) {
      return this.marqueeContent.events_reach.events_reach_count;
    } else {
      return "0";
    }
  }
  getEventsReachRate() {
    if (this.marqueeContent) {
      return this.marqueeContent.events_reach.events_reach_rate;
    } else {
      return "0";
    }
  }

  getTicketsCount() {
    if (this.marqueeContent) {
      return this.marqueeContent.tickets.tickets_count;
    } else {
      return "0";
    }
  }
  getTicketsRate() {
    if (this.marqueeContent) {
      return this.marqueeContent.tickets.tickets_rate;
    } else {
      return "0";
    }
  }

  getEarningCount() {
    if (this.marqueeContent) {
      return this.marqueeContent.earning.earning_count;
    } else {
      return "0";
    }
  }
  getEarningRate() {
    if (this.marqueeContent) {
      return this.marqueeContent.earning.earning_rate;
    } else {
      return "0";
    }
  }

  getPostsCount() {
    if (this.marqueeContent) {
      return this.marqueeContent.posts.posts_count;
    } else {
      return "0";
    }
  }
  getPostsRate() {
    if (this.marqueeContent) {
      return this.marqueeContent.posts.posts_rate;
    } else {
      return "0";
    }
  }

  getLikesCount() {
    if (this.marqueeContent) {
      return this.marqueeContent.likes.likes_count;
    } else {
      return "0";
    }
  }
  getLikesRate() {
    if (this.marqueeContent) {
      return this.marqueeContent.likes.likes_count;
    } else {
      return "0";
    }
  }

  getCommentsCount() {
    if (this.marqueeContent) {
      return this.marqueeContent.comments.comments_count;
    } else {
      return "0";
    }
  }
  getCommentsRate() {
    if (this.marqueeContent) {
      return this.marqueeContent.comments.comments_rate;
    } else {
      return "0";
    }
  }

  getSharesCount() {
    if (this.marqueeContent) {
      return this.marqueeContent.shares.shares_count;
    } else {
      return "0";
    }
  }
  getSharesRate() {
    if (this.marqueeContent) {
      return this.marqueeContent.shares.shares_rate;
    } else {
      return "0";
    }
  }

  getPostsReachCount() {
    if (this.marqueeContent) {
      return this.marqueeContent.posts_reach.posts_reach_count;
    } else {
      return "0";
    }
  }
  getPostsReachRate() {
    if (this.marqueeContent) {
      return this.marqueeContent.posts_reach.posts_reach_rate;
    } else {
      return "0";
    }
  }
}
