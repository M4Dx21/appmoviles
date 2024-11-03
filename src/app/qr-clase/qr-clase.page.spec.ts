import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QrClasePage } from './qr-clase.page';

describe('QrClasePage', () => {
  let component: QrClasePage;
  let fixture: ComponentFixture<QrClasePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QrClasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
