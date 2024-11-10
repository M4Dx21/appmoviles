import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultaAsistenciaPage } from './consulta-asistencia.page';

describe('ConsultaAsistenciaPage', () => {
  let component: ConsultaAsistenciaPage;
  let fixture: ComponentFixture<ConsultaAsistenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
