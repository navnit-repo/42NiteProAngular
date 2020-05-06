import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-news-feed",
  templateUrl: "./news-feed.component.html",
  styleUrls: ["./news-feed.component.css"]
})
export class NewsFeedComponent implements OnInit {
  reachTab = true;
  likeTab = false;
  shareTab = false;
  commenttab = false;

  constructor() {}

  ngOnInit() {}

  onReachTabClick() {
    this.reachTab = true;
    this.likeTab = false;
    this.shareTab = false;
    this.commenttab = false;
  }

  onLikeTabClick() {
    this.reachTab = false;
    this.likeTab = true;
    this.shareTab = false;
    this.commenttab = false;
    console.log("working");
  }

  onShareTabClick() {
    this.reachTab = false;
    this.likeTab = false;
    this.shareTab = true;
    this.commenttab = false;
  }

  onCommentTabClick() {
    this.reachTab = false;
    this.likeTab = false;
    this.shareTab = false;
    this.commenttab = true;
  }
}
