import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/service/dashboard.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-audut-trail',
  templateUrl: './audut-trail.component.html',
  styleUrls: ['./audut-trail.component.scss']
})
export class AudutTrailComponent implements OnInit {
  activityList: any[];
  filter = new FormControl('');
  page = 1;
  pageSize = 10;
  collectionSize;
  constructor(private service: DashboardService) { }

  ngOnInit() {
    this.getActivities();
  }

  getActivities() {
    this.service.getAuditTrail().subscribe((data: any) => {
      if (data) {
        this.activityList = data.data;
        this.collectionSize = this.activityList.length;
      }
    });
  }

  get activities(): any[] {
    return this.activityList
    .map((activity, i) => ({id: i + 1, ...activity}))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
