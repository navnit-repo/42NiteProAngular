import { Component, OnInit } from "@angular/core";
import { NgSelectModule, NgOption } from "@ng-select/ng-select";
import { AuthUserService } from "../authUserService/auth-user.service";

import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { confirmPasswordChecker } from "./confirmPassword.validator";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  device_type: number = 2;
  registerForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private authUserService: AuthUserService
  ) {
    this.registerForm = this.formBuilder.group(
      {
        username: new FormControl(
          "",
          Validators.compose([Validators.required])
        ),

        email: new FormControl(
          "",
          Validators.compose([
            Validators.required,
            Validators.pattern(
              "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
            )
          ])
        ),

        password: new FormControl(
          "",
          Validators.compose([Validators.required])
        ),
        confirmPassword: new FormControl(
          "",
          Validators.compose([Validators.required])
        ),

        phoneNumber: new FormControl(
          "",
          Validators.compose([Validators.required])
        ),
        userRole: new FormControl(
          "",
          Validators.compose([Validators.required])
        ),

        termsAndCondition: new FormControl(
          "",
          Validators.compose([Validators.required])
        )
      },
      { validators: confirmPasswordChecker }
    );
  }

  // convenience getter for easy access to form fields
  get inputValues() {
    return this.registerForm.controls;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authUserService
        .getUserRegister(
          this.inputValues.username.value,
          this.inputValues.email.value,
          this.inputValues.password.value,
          this.inputValues.phoneNumber.value,
          this.inputValues.userRole.value,
          this.device_type
        )
        .subscribe(data => {
          console.log(data);
          let profile = data.data;
          this.authUserService.setUserProfile(profile);
         // this.router.navigate(["/user-profile"]);
          // this.router.navigate(["/user-profile"]);
        });
    } else {
      alert("invalid form");
    }
  }

  ngOnInit() {}
}
