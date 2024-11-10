import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-consulta-asistencia',
  templateUrl: './consulta-asistencia.page.html',
  styleUrls: ['./consulta-asistencia.page.scss'],
})
export class ConsultaAsistenciaPage implements OnInit {
  asistencias: any[] = [];
  profesorNombre: string = '';

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.cargarAsistencias();
  }

  cargarAsistencias() {
    this.firestoreService.getCurrentUser().subscribe((profesor) => {
      if (profesor) {
        this.profesorNombre = profesor.name;

        this.firestoreService.getAsistenciasPorProfesor(this.profesorNombre).subscribe((asistencias) => {
          this.asistencias = asistencias;
        });
      }
    });
  }
}
