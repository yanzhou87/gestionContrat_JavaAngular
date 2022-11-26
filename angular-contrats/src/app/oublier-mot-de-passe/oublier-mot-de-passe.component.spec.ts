import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OublierMotDePasseComponent } from './oublier-mot-de-passe.component';

describe('OublierMotDePasseComponent', () => {
  let component: OublierMotDePasseComponent;
  let fixture: ComponentFixture<OublierMotDePasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OublierMotDePasseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OublierMotDePasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
