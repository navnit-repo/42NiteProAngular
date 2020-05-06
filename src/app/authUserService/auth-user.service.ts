import { Injectable, NgZone } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { User } from "../model/user";
import { UserData } from "../model/user-data";
import { Router } from "@angular/router";

@Injectable()
export class AuthUserService {
 userProfile: any;
 public user_id: any;
 public user_role;
  

  //Sign in URL
   signInURL = "https://www.whats42nite.com/production/apiv2/users/login";

  //Sign up URL
  registerURL = "https://www.whats42nite.com/production/apiv2/users/register";

  //Forgot password URL
  forgotPasswordURL =
    "https://www.whats42nite.com/production/apiv2/users/forgotpassword";

  //View user profile URL
  viewUserProfileURL =
    "https://www.whats42nite.com/production/apiv2/users/viewprofile";

  //update user profile URL
  updateUserProfileURL =
    "https://www.whats42nite.com/production/apiv2/users/editprofile";

  //Observable for current user who logged in
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  //Refresh Needed by subject
  public _refreshNeeded$ = new Subject<void>();
  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  

  //constructor
  constructor(
    private http: HttpClient,
    public router: Router 
    // public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(sessionStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentUser.subscribe(user=>{
      this.userProfile = user.data;
      this.user_id = user.data.user_id;
      this.user_role = user.data.user_role;
    })
  }

  //getting and setting user data
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  setUserProfile(profile) {
    this.userProfile = profile;
  }
  
  getUserRole(){
    return this.userProfile.user_role;
  }

  getUseProfile() {
    return this.userProfile;
  }

  
  //Sign in method
  getUserLogin(email, password): Observable<any> {
    const body = new HttpParams().set("email", email).set("password", password);

    return this.http
      .post<any>(this.signInURL, body, {
        headers: new HttpHeaders().set(
          "Content-Type",
          "application/x-www-form-urlencoded"
        )
      })
      .pipe(
        map(user => {
          if (user.status == "success") {
            this.user_id = user.data.user_id;
            // store user details in local storage to keep user logged in between page refreshes
            sessionStorage.setItem("currentUser", JSON.stringify(user));
            this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }

  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    return user !== null;
  }

  //Sign up method
  getUserRegister(
    name,
    email,
    password,
    mobile_number,
    userRole,
    device_type
  ): Observable<any> {
    const body = new HttpParams()
      .set("name", name)
      .set("email", email)
      .set("password", password)
      .set("mobile_no", mobile_number)
      .set("user_role", userRole)
      .set("device_type", device_type);

    return this.http
      .post<any>(this.registerURL, body, {
        headers: new HttpHeaders()
          .set("content-type", "application/x-www-form-urlencoded")
          .set("Cache-control", "no-cache")
          .set("postman-token", "2c6ac039-1854-042d-c6e7-dfcf05193cb3")
          .set("Access-Control-Allow-Origin", "*")
      })
      .pipe(
        map(user => {
          if (user) {
            // store user details in local storage to keep user logged in between page refreshes
            sessionStorage.setItem("currentUser", JSON.stringify(user));
            this.currentUserSubject.next(user);
            this.router.navigate(["user-profile"]);
          }

          return user;
        })
      );
  }

  //Forgot password method
  getForgotPassword(email): Observable<any> {
    const body = new HttpParams().set("email", email);

    return this.http.post<any>(this.forgotPasswordURL, body, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      )
    });
  }

  //Get User Profile Data
  getUserProfileData(user_id) {
    const body = new HttpParams().set("user_id", user_id);
    return this.http
      .post(this.viewUserProfileURL, body, {
        headers: new HttpHeaders().set(
          "Content-Type",
          "application/x-www-form-urlencoded"
        )
      })
      
  }

  //Update User Profile Data
  updateUserProfileData(user_id, name, email, mobile_no) {
    const body = new HttpParams()
      .set("user_id", user_id)
      .set("name", name)
      .set("email", email)
      .set("mobile_no", mobile_no);
    //.set("user_pic", user_pic);
    // const body: FormData = new FormData();
    // body.append("user_id", user_id);
    // body.append("name", name);
    // body.append("email", email);
    // body.append("mobile_no", mobile_no);
    // body.append("user_pic", user_pic, user_pic_name);

    return this.http.post(this.updateUserProfileURL, body, {
      headers: new HttpHeaders().set(
        "Content-Type",
        "application/x-www-form-urlencoded"
      )
    //  .set("cache-control", "no-cache")
     // .set("Access-Control-Allow-Origin", "*")
     // .set("Postman-Token", "c881d304-79f7-3665-fb45-6407cdd5bc68")
     // .set("X-Requested-With", "XMLHttpRequest")
    }).pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  //logout method
  getUserLogout() {
    sessionStorage.removeItem("currentUser");
    this.router.navigate(["signin"]);
  }
}
