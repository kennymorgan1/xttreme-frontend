import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DashboardService } from 'src/app/service/dashboard.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {
  public categoryForm: FormGroup;
  loading = false;
  submitted = false;
  inflowCategoryList = [];
  count = 0;
  offset = 0;
  limit = 3;
  disableBtn = false;
  categoryId;
  categoryData: any;
  categoryName;
  constructor(
    private service: DashboardService,
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToastrManager) {
      this.categoryId = this.route.snapshot.paramMap.get('categoryId');
     }

  ngOnInit() {
    this.getOneCategory();
  }

  getOneCategory() {
    this.service.getOneCategory(this.categoryId).subscribe(
      (data: any) => {
        this.categoryData = data.data[0];
        this.categoryName = this.categoryData.secret.name;
      });
  }

  onSubmit(updateCategoryForm) {
    if (updateCategoryForm.valid) {
      this.loading = true;
      const id = this.categoryId;
      const payload = {
        name: this.categoryData.secret.name,
        description: this.categoryData.secret.description
      };
      this.service.updateCategory(payload, id).subscribe(
        (data: any) => {
          this.toaster.successToastr('Category updated successfully', null, {toastTimeout: 3000} );
          this.loading = false;
          this.router.navigate(['/category']);
        },
        error => {
          this.toaster.errorToastr('Category update failed', null, {toastTimeout: 5000} );
          this.loading = false;
        }
      );
    }
  }
}
