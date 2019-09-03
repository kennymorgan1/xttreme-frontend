import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authType = '';
  registerErr = false;
  loginErr = false;
  public registerForm: FormGroup;
  public loginForm: FormGroup;
  isRegister = true;
  isLogin = false;
  errMessage;
  resendResponse;
  urlPath: string;
  disableBtn = false;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.route.url.subscribe(data => {
      this.authType = data[data.length - 1].path;
    });
    this.loginFormField();
    // this.registerFormFields();
  }

  loginFormField() {
    this.loginForm = new FormGroup ({
      loginEmail: new FormControl('', [Validators.required, CustomValidators.email]),
      loginPassword: new FormControl('', Validators.required),
    });
  }

  get username() {return this.loginForm.get('username'); }
  get password() {return this.loginForm.get('password'); }

  login() {
    if (this.loginForm.valid) {
      const payload = this.loginForm.value;
    }
    this.resetField();
    this.getDisableBtn(true);
  }

  resetField() {
    this.loginErr  = null;
    this.registerErr = null;
  }

  private getDisableBtn(value: boolean) { this.disableBtn = value; }
  get getDisableLoginState() { return this.loginForm.invalid || this.disableBtn; }

  // registerFormFields() {
  //   const password = new FormControl('', Validators.required);
  //   const certainPassword = new FormControl('', [CustomValidators.equalTo(password), ]);
  //   this.registerForm = new FormGroup({
  //     firstName: new FormControl('', [Validators.required, Validators.maxLength(30),
  //                                     Validators.minLength(3)]), <!-- <form class="m-login__form m-form" action="">
  //     lastName: new FormControl('', [Validators.required, Validators.maxLength(30),
  //                                    Validators.minLength(3)]),
  //     email: new FormControl('', [Validators.required, CustomValidators.email]),
  //     password,
  //     confirmPassword: certainPassword,
  //     wattBankSerialNumber: new FormControl()
  //   })
  // }

  // register() {
  //   if (this.registerForm.valid) {
  //     const payload = this.registerForm.value;
  //   }
  //   this.resetField();
  //   this.getDisableBtn(true);
  // }

  get getDisableRegisterState() { return this.registerForm.invalid || this.disableBtn; }

}
