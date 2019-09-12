import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  token;
  response;
  responseErr;
  noResponseErr;
  showresend = false;
  email = '';
  disableBtn = false;
  confirmEmailErr;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authSrv: AuthServiceService) {
    this.token = this.route.snapshot.paramMap.get('token');
    if (this.token) {
      this.confirm(this.token);
    }
   }

  ngOnInit() {
  }
  confirm(token) {
    console.log(token);
    this.authSrv.confirmation(token).subscribe(
      data => {
        this.response = data;
      }, err => {
        if (err.status ===  412) {
         this.response =  this.responseErr = err.msg || '';
        } else if (err.status === 422) {
          this.getSweetAlert('Success', 'success',  err.msg || 'This user has already been verified', 'confirm-success');
          this.router.navigate(['/referral/login']);
        } else {
          this.noResponseErr = err.error.data.msg;
          console.log(this.noResponseErr);
        }
      });
  }
  login() {
    this.router.navigate(['/login']);
  }

showResend() {
    this.showresend = true;
    this.responseErr = null;
    this.noResponseErr = null;
  }
 getSubmitState(email) {
  return email.invalid || this.disableBtn;
  }
  resend() {
    if (this.email) {
      this.disableBtn = true;
      this.authSrv.resend(this.email).subscribe(
        (data: any) => {
          this.disableBtn = false;
          this.getSweetAlert('Success', 'success',  data.data.msg || 'A verification email has been sent', 'confirm-success');
        }, err => {
          if (err.code === 404) {
            this.getSweetAlert('', 'warning',  err.msg || 'We were unable to find a user with that email', 'err-404');
          } else if (err.code === 412) {
            this.getSweetAlert('', 'warning',  err.msg || 'We were unable to find a user with that email', 'err-412');
          }
          this.confirmEmailErr = err;
          this.disableBtn = false;
        }
      );
    }
  }
  getSweetAlert(title, type, text, caseType ) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    });
    let btnText;
    if (caseType === 'confirm-success' || caseType === 'err-412') {
      btnText = 'Click to login';
    } else  {
      btnText = 'Click to register';
    }
    swalWithBootstrapButtons.fire({
      title,
      text,
      type,
      focusConfirm: false,
      showCloseButton: true,
      confirmButtonText: btnText,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        if (caseType === 'confirm-success' || caseType === 'err-412') {this.router.navigate(['/login']);
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
