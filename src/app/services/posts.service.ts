import { Injectable, NgZone } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { User } from "../model/user";
import { UserData } from "../model/user-data";
import { Router } from "@angular/router";
import { AuthUserService } from "../authUserService/auth-user.service";

@Injectable()
export class PostsService {

  private _refreshNeeded$ = new Subject <void>();

  get refreshNeeded$ () {
    return this._refreshNeeded$;
  }

  constructor(
    private http: HttpClient,
    public router: Router,
    private authUserService: AuthUserService
  ) {}

  //get posts
 
  private postSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  public $postObservable = this.postSubject.asObservable();

  public postList: any;
  getUserPosts(venue_id) {
    let requestURL =
      "https://www.whats42nite.com/production/apiv2/posts/get_posts";
    let body = new HttpParams()
      .set("user_id", this.authUserService.user_id)
      .set("venue_id", venue_id);

    return this.http.post(requestURL, body, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      )
    })
  
  }

  //getting post commment
  getPostComments(venue_id, post_id) {
    let requestURL =
      "https://www.whats42nite.com/production/apiv2/posts/get_comments";
    let body = new HttpParams()
      .set("user_id", this.authUserService.user_id)
      .set("venue_id", venue_id)
      .set("post_id", post_id);

    return this.http.post(requestURL, body, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      )
    });
  }

  //share post
    sharePost(venue_id, post_id)  {
    let requestURL =
      "https://www.whats42nite.com/production/apiv2/posts/post_share";
    let body = new HttpParams()
      .set("user_id", this.authUserService.user_id)
      .set("venue_id", venue_id)
      .set("post_id", post_id);

    return this.http.post(requestURL, body, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      )
    }).pipe(
      tap(()=> {
        this._refreshNeeded$.next();
      })
    )
  }

  //like post 
      likePost(venue_id, post_id) {
    let requestURL =
      "https://www.whats42nite.com/production/apiv2/posts/post_like";
    let body = new HttpParams()
      .set("user_id", this.authUserService.user_id)
      .set("venue_id", venue_id)
      .set("post_id", post_id);

    return this.http.post(requestURL, body, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      )
    }).pipe(
      tap(()=> {
        this._refreshNeeded$.next();
      })
    )
  }

  //create comment for post 

   createComment(venue_id, post_id, content) {
    let requestURL =
      "https://www.whats42nite.com/production/apiv2/posts/post_share";
    let body = new HttpParams()
      .set("user_id", this.authUserService.user_id)
      .set("venue_id", venue_id)
      .set("post_id", post_id)
      .set("content", content);

    return this.http.post(requestURL, body, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      )
    }).pipe(
      tap(()=> {
        this._refreshNeeded$.next();
      })
    )
  }

}
