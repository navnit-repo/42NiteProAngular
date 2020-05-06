import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { AuthUserService } from "../authUserService/auth-user.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.css"]
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  alertDanger = false;
  alertSuccess = false;

  constructor(
    public formBuilder: FormBuilder,
    private authUserService: AuthUserService
  ) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(
            "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
          )
        ])
      )
    });
  }

  get inputValues() {
    return this.forgotPasswordForm.controls;
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.authUserService
        .getForgotPassword(this.inputValues.email.value)
        .subscribe(data => {
          if (data.status == "Failure") {
            console.log(data);
            this.alertDanger = true;
            setTimeout(() => {
              this.alertDanger = false;
            }, 3000);
          } else if (data.status == "Success") {
            console.log(data);
            this.alertSuccess = true;
            setTimeout(() => {
              this.alertSuccess = false;
            }, 3000);
          }
        });
    } else {
      alert("inavlid form");
    }
  }

  ngOnInit() {}
}
