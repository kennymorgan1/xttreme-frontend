import { Component, OnInit, PipeTransform } from '@angular/core';
import { DashboardService } from 'src/app/service/dashboard.service';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { SelectorMatcher } from '@angular/compiler';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

function search(text: string, pipe: PipeTransform, COUNTRIES): any[] {
  return COUNTRIES.filter(country => {
    const term = text.toLowerCase();
    return country.name.toLowerCase().includes(term)
        || pipe.transform(country.area).includes(term)
        || pipe.transform(country.population).includes(term);
  });
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryList: any[];
  filter = new FormControl('');
  tableValue: string;
  offset = 0;
  limit = 10;
  page = 1;
  pageSize = 4;
  collectionSize;
  constructor(private service: DashboardService, pipe: DecimalPipe, private route: Router) {
    // this.categoryList = this.filter.valueChanges.pipe(
    //   startWith(''),
    //   map(text => search(text, pipe, this.categoryList))
    // );
   }

  ngOnInit() {
    this.getCategories(this.offset, this.limit);
  }

  status(category) {
    return (category === true) ? 'active' : 'declined';
    // if(category === true) {
    //   return 'active';
    // }else {
    //   return 'declined';
    // }
  }

  updateCategory(content) {
    this.route.navigate(['/update-category', content._id]);
  }

  getCategories(offset, limit) {
    this.service.listCategories(offset, limit).subscribe((data: any) => {
      if (data) {
        this.categoryList = data.data;
        this.collectionSize = this.categoryList.length;
      }
      if (data.data.length === 0) {
        this.tableValue = 'hasNoValue';
      } else {
        this.tableValue = 'hasValue';
      }
    });
  }

  get categories(): any[] {
    return this.categoryList
      .map((category, i) => ({id: i + 1, ...category}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}

