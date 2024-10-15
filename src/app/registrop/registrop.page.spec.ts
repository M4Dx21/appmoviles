import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistropPage } from './registrop.page';

describe('RegistropPage', () => {
  let component: RegistropPage;
  let fixture: ComponentFixture<RegistropPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistropPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
