import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LectorqrPage } from './lectorqr.page';

describe('LectorqrPage', () => {
  let component: LectorqrPage;
  let fixture: ComponentFixture<LectorqrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LectorqrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
