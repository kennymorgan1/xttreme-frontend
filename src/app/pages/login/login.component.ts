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
  public registerForm: FormGroup;
  public loginForm: FormGroup;
  isRegister = true;
  isLogin = false;
  errMessage;
  resendResponse;
  urlPath: string;
  disableBtn = false;

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
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  loginFormField() {
    this.loginForm = new FormGroup ({
      loginEmail: new FormControl('', [Validators.required, CustomValidators.email]),
      loginPassword: new FormControl('', Validators.required),
    });
  }

  get loginEmail() { return this.loginForm.get('loginEmail'); }
  get loginPassword() { return this.loginForm.get('loginPassword'); }

  login() {
    if (this.loginForm.valid) {
      const payload = {
        username: this.loginEmail.value,
        password: this.loginPassword.value
      };
      this.resetField();
      this.getDisableBtn(true);
      this.authSrv.login(payload).subscribe((data: LoginInterface) => {
        this.getDisableBtn(false);
        this.router.navigate(['/dashboard']);
      }, err => {
        this.loginErr = true;
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
    console.log(1);
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      console.log(2);
      const payload = this.registerForm.value;
      this.resetField();
      this.getDisableBtn(true);
      this.authSrv.register(payload).subscribe(
      (data: RegisterInterface) => {
        this.getDisableBtn(false);
        this.registerForm.reset();
        // this.getSweetAlert('Success', 'success' , data.data.msg || 'A verification email has been sent', 'register');
      }, err => {
        this.getDisableBtn(false);
        this.registerErr = err;
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
          this.router.navigate(['/register']);
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
