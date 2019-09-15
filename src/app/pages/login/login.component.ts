import { AuthServiceService } from './../../service/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { LoginInterface, RegisterInterface } from 'src/app/interface/auth-interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authType = '';
  registerErr = false;
  loginErr = false;
  loginErrorMsg;
  registerErrorMsg;
  public registerForm: FormGroup;
  public loginForm: FormGroup;
  public forgetPasswordForm: FormGroup;
  isRegister = true;
  isLogin = false;
  errMessage;
  resendResponse;
  urlPath: string;
  disableBtn = false;
  responseErr;
  confirmEmailErr;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              private authSrv: AuthServiceService) { }

  ngOnInit() {
    this.route.url.subscribe(data => {
      this.authType = data[data.length - 1].path;
    });
    this.loginFormField();
    this.registerFormFields();
    this.forgetPasswordFormField();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  clearLoginErr() {
    this.loginErr = false;
  }

  forgetPasswordFormField() {
    this.forgetPasswordForm = new FormGroup ({
      forgetEmail: new FormControl('', [Validators.required, CustomValidators.email]),
    });
  }

  get forgetEmail() { return this.forgetPasswordForm.get('forgetEmail'); }
  get getDisableState() { return this.forgetPasswordForm.invalid || this.disableBtn; }

  loginFormField() {
    this.loginForm = new FormGroup ({
      loginEmail: new FormControl('', [Validators.required, CustomValidators.email]),
      loginPassword: new FormControl('', Validators.required),
    });
  }

  get loginEmail() { return this.loginForm.get('loginEmail'); }
  get loginPassword() { return this.loginForm.get('loginPassword'); }

  forgetPassword() {
    if (this.forgetPasswordForm.valid) {
        const email: string = this.forgetEmail.value;
        this.getDisableBtn(true);
        this.authSrv.forgetPassword(email).subscribe(
          (data: any) => {
            this.disableBtn = false;
            this.getSweetAlert('Success', 'success',  'reset password link has been sent to your email', 'forget-succes');
          }, err => {
            if (err.status === 404) {
              this.getSweetAlert('', 'warning',  err.msg || 'We were unable to find a user with that email', 'forget-fail');
            } else {
              this.responseErr = err.msg;
            }
            this.confirmEmailErr = err;
            this.disableBtn = false;
          });
    }
  }

  login() {
    if (this.loginForm.valid) {
      const payload = {
        username: this.loginEmail.value,
        password: this.loginPassword.value
      };
      this.resetField();
      this.getDisableBtn(true);
      this.authSrv.login(payload).subscribe(
        (data: any) => {
        this.getDisableBtn(false);
        localStorage.setItem('currentUser', JSON.stringify(data.data));
        this.router.navigate(['/dashboard']);
      }, err => {
        console.log(err);
        if (err.status === 400) {
          // this.getSweetAlert('', 'warning' , err.error.data.msg, 'login');
          this.loginErr = true;
          this.loginErrorMsg = err.error.data.msg;
        }
        this.getDisableBtn(false);
      });
    }
  }

  resetField() {
    this.loginErr  = null;
    this.registerErr = null;
  }

  private getDisableBtn(value: boolean) { this.disableBtn = value; }
  get getDisableLoginState() { return this.loginForm.invalid || this.disableBtn; }

  registerFormFields() {
    const password = new FormControl('', Validators.required);
    const certainPassword = new FormControl('', [CustomValidators.equalTo(password), ]);
    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(30),
                                      Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(30),
                                     Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, CustomValidators.email]),
      password,
      confirmPassword: certainPassword
    });
  }

  get firstName() {return this.registerForm.get('firstName'); }
  get lastName() {return this.registerForm.get('lastName'); }
  get email() {return this.registerForm.get('email'); }
  get password() {return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get passwordMatch() {return this.password.value !== this.confirmPassword.value; }

  register() {
    if (this.registerForm.valid) {
      const payload = this.registerForm.value;
      this.resetField();
      this.getDisableBtn(true);
      this.authSrv.register(payload).subscribe(
      (data: any) => {
        this.getDisableBtn(false);
        this.registerForm.reset();
        this.getSweetAlert('Success', 'success' , data.data.msg || 'A verification email has been sent', 'register');
      }, err => {
        this.getDisableBtn(false);
        if (err.status === 400) {
          // this.getSweetAlert('', 'warning' , err.error.data.msg, 'login');
          this.registerErr = true;
          this.registerErrorMsg = err.error.data.msg;
        }
      }
    );
    }
  }

  get getDisableRegisterState() { return this.registerForm.invalid || this.disableBtn; }

  getSweetAlert(title, type, text, route ) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons.fire({
      title,
      text,
      type,
      focusConfirm: false,
      showCloseButton: true,
      // showConfirmButton: route === 'login' ? true : false,
      confirmButtonText: route === 'login' ? 'Click to resend link' : 'Ok',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        if (route === 'login') {
          this.authSrv.resend(this.loginEmail.value).subscribe(
            (data: any) => {
              this.resendResponse = data;
            }, err => console.log(err)
          );
        } else {
          this.router.navigate(['/register']);
        }
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'error'
        ); }
    });
  }

}
