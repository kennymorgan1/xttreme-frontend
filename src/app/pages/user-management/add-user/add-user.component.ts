import { ToastrManager } from 'ng6-toastr-notifications';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  public userForm: FormGroup;
  loading = false;
  submitted = false;
  users = [];
  disableBtn = false;
  constructor(
    private service: AuthServiceService,
    private toaster: ToastrManager
  ) { }

  ngOnInit() {
    this.userFormFields();
  }

  userFormFields() {
    const password = new FormControl('', Validators.required);
    this.userForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(30),
                                      Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(30),
                                     Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, CustomValidators.email]),
      password,
    });
  }

  get firstName() {return this.userForm.get('firstName'); }
  get lastName() {return this.userForm.get('lastName'); }
  get email() {return this.userForm.get('email'); }
  get password() {return this.userForm.get('password'); }
  get getDisableState() { return this.userForm.invalid || this.disableBtn; }
  private getDisableBtn(value: boolean) { this.disableBtn = value; }

  onSubmit() {
    if (this.userForm.valid) {
      this.submitted = true;
      this.getDisableBtn(true);
      const payload = this.userForm.value;
      this.service.addUser(payload).subscribe(
        (data: any) => {
          this.toaster.successToastr('User Added successfully', null, {toastTimeout: 3000} );
          this.getDisableBtn(false);
          this.loading = false;
        },
        error => {
          this.toaster.errorToastr('User Addition failed', null, {toastTimeout: 5000} );
          this.getDisableBtn(false);
          this.loading = false;
        }
      );
    }
  }

}
