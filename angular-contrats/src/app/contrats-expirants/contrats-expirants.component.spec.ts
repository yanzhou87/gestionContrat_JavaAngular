import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratsExpirantsComponent } from './contrats-expirants.component';

describe('ContratsExpirantsComponent', () => {
  let component: ContratsExpirantsComponent;
  let fixture: ComponentFixture<ContratsExpirantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratsExpirantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratsExpirantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
