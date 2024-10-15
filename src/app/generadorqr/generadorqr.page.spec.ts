import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneradorqrPage } from './generadorqr.page';

describe('GeneradorqrPage', () => {
  let component: GeneradorqrPage;
  let fixture: ComponentFixture<GeneradorqrPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneradorqrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
