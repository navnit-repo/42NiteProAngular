import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthUserService } from "../authUserService/auth-user.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-edit-user-profile",
  templateUrl: "./edit-user-profile.component.html",
  styleUrls: ["./edit-user-profile.component.css"]
})
export class EditUserProfileComponent implements OnInit {
  editUserProfileForm: FormGroup;

  //Image file
  imageFile: File[] = [];

  //current user data
  userProfile: any;
  currentUser: any;
  currentUserSubscription: Subscription;
  viewUserData: any;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authUserService: AuthUserService
  ) {
    this.editUserProfileForm = this.formBuilder.group({
      email: new FormControl({value: '', disabled: true}, Validators.compose([Validators.required])),
      name: new FormControl("", Validators.compose([Validators.required])),
      mobile_no: new FormControl("", Validators.compose([Validators.required])),
     // profile_pic: new FormControl("", Validators.compose([Validators.required])),
    });
  }

  ngOnInit() {
    this.currentUserSubscription = this.authUserService.currentUser.subscribe(
      user => {
        this.userProfile = user.data;
        let user_id = this.userProfile.user_id;
        this.authUserService.getUserProfileData(user_id).subscribe(data => {
          this.viewUserData = data;
          this.editUserProfileForm.controls['name'].setValue(this.viewUserData.data.name);
          this.editUserProfileForm.controls['email'].setValue(this.viewUserData.data.email);
          this.editUserProfileForm.controls['mobile_no'].setValue(this.userProfile.mobile_no);
        });
      }
    );

    
  }

  getUserName() {
    if (this.viewUserData) {
      return this.viewUserData.data.name;
    }
  }

  getUserEmail() {
    if (this.viewUserData) {
      return this.viewUserData.data.email;
    }
  }

  getUserMobileNo() {
    if (this.userProfile) {
      return this.userProfile.mobile_no;
    }
  }

  // convenience getter for easy access to form fields
  get inputValues() {
    return this.editUserProfileForm.controls;
  }

  //Adding and removing image file method
  onSelect(event) {
    console.log(event);
    this.imageFile.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.imageFile.splice(this.imageFile.indexOf(event), 1);
  }


  //On for Submit
  onSubmit() {
    console.log(this.inputValues.name.value,this.inputValues.email.value);
    this.authUserService
      .updateUserProfileData(
        this.viewUserData.data.id,
        this.inputValues.name.value,
        this.inputValues.email.value,
        this.inputValues.mobile_no.value,
       // this.imageFile[0],
        //this.imageFile[0].name
      )
      .subscribe(data => {
        if (data) {
          console.log(data,'output')
          this.router.navigate(["user-profile"]);
          this.authUserService.getUserProfileData(this.viewUserData);
        }
      });
  }
}
