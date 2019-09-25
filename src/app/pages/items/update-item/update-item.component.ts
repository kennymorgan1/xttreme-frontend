import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DashboardService } from 'src/app/service/dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.scss']
})
export class UpdateItemComponent implements OnInit {
  public itemForm: FormGroup;
  loading = false;
  submitted = false;
  categoryList = [];
  count = 0;
  offset = 0;
  limit = 3;
  disableBtn = false;
  itemId;
  itemName;
  itemData: any;

  constructor(
    private service: DashboardService,
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToastrManager,
    private fb: FormBuilder) {
      this.itemId = this.route.snapshot.paramMap.get('itemId');
     }

  ngOnInit() {
    this.getCategories(this.offset, this.limit);
    this.getOneItem();
  }

  getOneItem() {
    this.service.getOneItem(this.itemId).subscribe((data: any) => {
      if (data) {
        this.itemData = data.data;
        this.itemName = this.itemData.secret.name;

        this.itemFormField();
      }
    });
  }

  getCategories(offset, limit) {
    this.service.listCategories(offset, limit).subscribe((data: any) => {
      if (data) {
        this.categoryList = data.data;
      }
    });
  }

  get f() { return this.itemForm.controls; }
  get getDisableState() { return this.itemForm.invalid || this.disableBtn; }
  private getDisableBtn(value: boolean) { this.disableBtn = value; }

  itemFormField() {
    let initCategoryId = '';
    if (this.itemData.category) {
      if (typeof this.itemData.category === 'string') {
        initCategoryId = this.itemData.category;
      } else {
        initCategoryId = this.itemData.category._id;
      }
    }

    this.itemForm = this.fb.group({
      name: [this.itemData.secret.name || null, Validators.compose([Validators.required])],
      description: [this.itemData.secret.description || null],
      category: [initCategoryId || null, Validators.compose([Validators.required])],
      quantity: [this.itemData.secret.quantity || null],
      tag: [this.itemData.tag || null],
      reorderLevel: [this.itemData.secret.reorder_level || null]
    });
  }

  onSubmit() {
    if (this.itemForm.valid) {
      this.submitted = true;
      this.getDisableBtn(true);
      const id = this.itemId;
      const payload = {
        name: this.f.name.value,
        description: this.f.description.value,
        category: this.f.category.value,
        quantity: this.f.quantity.value,
        tag: this.f.tag.value,
        reorder_level: this.f.reorderLevel.value
      };
      this.service.updateItem(payload, id).subscribe(
        (data: any) => {
          this.toaster.successToastr('Item Updated successfully', null, {toastTimeout: 3000} );
          this.getDisableBtn(false);
          this.loading = false;
          this.router.navigate(['/items']);
        },
        error => {
          this.toaster.errorToastr('Item Update failed', null, {toastTimeout: 5000} );
          this.getDisableBtn(false);
          this.loading = false;
        }
      );
    }
  }
}
