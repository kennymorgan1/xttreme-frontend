import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudutTrailComponent } from './audut-trail.component';

describe('AudutTrailComponent', () => {
  let component: AudutTrailComponent;
  let fixture: ComponentFixture<AudutTrailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudutTrailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudutTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
