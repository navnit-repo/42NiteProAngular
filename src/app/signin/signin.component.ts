import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthUserService } from "../authUserService/auth-user.service";
import { User } from "../model/user";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  alertDanger = false;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authUserService: AuthUserService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(
            "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
          )
        ])
      ),

      password: new FormControl("", Validators.compose([Validators.required]))
    });
  }

  // convenience getter for easy access to form fields
  get inputValues() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.authUserService
      .getUserLogin(
        this.inputValues.email.value,
        this.inputValues.password.value
      )
      .subscribe(data => {
        if (data.status == "success") {
          console.log(data);
          this.loading = true;
          let user_id = data.data.user_id;
          console.log(user_id);
          this.router.navigate(["user-profile"]);
        } else if (data.status == "failure") {
          console.log(data);
          this.alertDanger = true;
          if (this.alertDanger == true) {
            setTimeout(() => {
              this.alertDanger = false;
            }, 3000);
          }
        }
      });
  }
}
