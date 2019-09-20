import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/service/dashboard.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {
  public itemForm: FormGroup;
  loading = false;
  submitted = false;
  categoryList = [];
  count = 0;
  offset = 0;
  limit = 3;
  disableBtn = false;
  constructor(
    private service: DashboardService,
    private toaster: ToastrManager) { }

  ngOnInit() {
    this.itemFormField();
    this.getCategories(this.offset, this.limit);
  }

  getCategories(offset, limit) {
    this.service.listCategories(offset, limit).subscribe((data: any) => {
      if (data) {
        this.categoryList = data.data;
      }
    });
  }

  get name() { return this.itemForm.get('name'); }
  get description() { return this.itemForm.get('description'); }
  get category() { return this.itemForm.get('category'); }
  get quantity() { return this.itemForm.get('quantity'); }
  get tag() { return this.itemForm.get('tag'); }
  get reorderLevel() { return this.itemForm.get('reorderLevel'); }
  get getDisableState() { return this.itemForm.invalid || this.disableBtn; }
  private getDisableBtn(value: boolean) { this.disableBtn = value; }

  itemFormField() {
    this.itemForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(),
      category: new FormControl('', [Validators.required]),
      quantity: new FormControl(),
      tag: new FormControl(),
      reorderLevel: new FormControl()
    });
  }

  onSubmit() {
    if (this.itemForm.valid) {
      this.submitted = true;
      this.getDisableBtn(true);
      const payload = {
        name: this.name.value,
        description: this.description.value,
        category: this.category.value,
        quantity: this.quantity.value,
        tag: this.tag.value,
        reorder_level: this.reorderLevel.value
      };
      this.service.createItem(payload).subscribe(
        (data: any) => {
          this.toaster.successToastr('Item created successfully', null, {toastTimeout: 3000} );
          this.getDisableBtn(false);
          this.loading = false;
        },
        error => {
          this.toaster.errorToastr('Item creation failed', null, {toastTimeout: 5000} );
          this.getDisableBtn(false);
          this.loading = false;
        }
      );
    }
  }
}
