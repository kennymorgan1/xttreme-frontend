import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DashboardService } from 'src/app/service/dashboard.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  public categoryForm: FormGroup;
  loading = false;
  submitted = false;
  inflowCategoryList = [];
  count = 0;
  offset = 0;
  limit = 3;
  disableBtn = false;
  constructor(
    private service: DashboardService,
    private toaster: ToastrManager) { }

  ngOnInit() {
    this.categoryFormField();
  }

  get name() { return this.categoryForm.get('name'); }
  get description() { return this.categoryForm.get('description'); }
  get getDisableState() { return this.categoryForm.invalid || this.disableBtn; }
  private getDisableBtn(value: boolean) { this.disableBtn = value; }

  categoryFormField() {
    this.categoryForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl()
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      this.submitted = true;
      this.getDisableBtn(true);
      const payload = {
        name: this.name.value,
        description: this.description.value
      };
      this.service.createCategory(payload).subscribe(
        (data: any) => {
          this.toaster.successToastr('Category created successfully', null, {toastTimeout: 3000} );
          this.getDisableBtn(false);
          this.loading = false;
        },
        error => {
          this.toaster.errorToastr('Category creation failed', null, {toastTimeout: 5000} );
          this.getDisableBtn(false);
          this.loading = false;
        }
      );
    }
  }

}
