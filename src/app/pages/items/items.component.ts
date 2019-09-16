import { Component, OnInit, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { DashboardService } from 'src/app/service/dashboard.service';
import { DecimalPipe } from '@angular/common';
import { startWith, map } from 'rxjs/operators';

function search(text: string, pipe: PipeTransform, COUNTRIES): any[] {
  return COUNTRIES.filter(country => {
    const term = text.toLowerCase();
    return country.name.toLowerCase().includes(term)
        || pipe.transform(country.area).includes(term)
        || pipe.transform(country.population).includes(term);
  });
}

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  itemList: any[];
  filter = new FormControl('');
  tableValue: string;
  offset = 0;
  limit = 10;
  constructor(private service: DashboardService, pipe: DecimalPipe) {
    // this.itemList = this.filter.valueChanges.pipe(
    //   startWith(''),
    //   map(text => search(text, pipe, this.itemList))
    // );
   }

  ngOnInit() {
    this.getItems(this.offset, this.limit);
  }

  getItems(offset, limit) {
    this.service.listItems(offset, limit).subscribe((data: any) => {
      if (data) {
        this.itemList = data.data;
      }
      if (data.data.length === 0) {
        this.tableValue = 'hasNoValue';
      } else {
        this.tableValue = 'hasValue';
      }
    });
  }

}

