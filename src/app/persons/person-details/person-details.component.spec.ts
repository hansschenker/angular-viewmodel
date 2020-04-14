import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersoDetailsComponent } from './person-details.component';

describe('PersoDetailsComponent', () => {
  let component: PersoDetailsComponent;
  let fixture: ComponentFixture<PersoDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersoDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
