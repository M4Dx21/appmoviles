import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-qr-clase',
  templateUrl: './qr-clase.page.html',
  styleUrls: ['./qr-clase.page.scss'],
})
export class QrClasePage {
  qrCodeValue: string = '';
  claseID: string = '';
  asignatura: string = 'PGY4121';
  profesorNombre: string = '';

  constructor(
    private alertController: AlertController,
    private firestoreService: FirestoreService
  ) {}

  generarQR() {
    this.firestoreService.getCurrentUser().subscribe((profesor) => {
      if (profesor) {
        this.profesorNombre = profesor.name;
        this.claseID = this.generarIDClase();
        const expiracion = Date.now() + 45 * 60 * 1000;
  
        this.qrCodeValue = JSON.stringify({
          claseID: this.claseID,
          expiracion: expiracion,
          profesorNombre: this.profesorNombre
        });
  
        console.log('QR generado:', this.qrCodeValue);
  
        this.firestoreService.createClase({
          claseID: this.claseID,
          asignatura: this.asignatura,
          profesorNombre: this.profesorNombre,
          expiracion,
          asistencias: []
        });
      }
    });
  }
  

  generarIDClase(): string {
    const fecha = new Date().toISOString().slice(0, 10);
    return `${this.asignatura}_${fecha}_${Math.random().toString(36).substring(2, 15)}`;
  }

  onCodeResult(resultString: string) {
    try {
      const [claseID, expiracion] = resultString.split(';').map((item) => item.split(':')[1]);
      const fechaExpiracion = parseInt(expiracion, 10);

      if (Date.now() > fechaExpiracion) {
        this.mostrarAlerta('QR Expirado', 'El código QR ya no es válido.');
        return;
      }

      this.marcarAsistencia(claseID);
    } catch (error) {
      this.mostrarAlerta('Error', 'No se pudo procesar el código QR. Asegúrate de que sea válido.');
    }
  }

  async marcarAsistencia(claseID: string) {
    try {
      const clase = await this.firestoreService.getClaseById(claseID).toPromise();
      if (clase) {
        clase.asistencias.push('estudiante'); 

        await this.firestoreService.updateClase(claseID, { asistencias: clase.asistencias });
        this.mostrarAlerta('Asistencia Confirmada', 'Tu asistencia ha sido registrada exitosamente.');
      } else {
        this.mostrarAlerta('Error', 'No se encontró la clase.');
      }
    } catch (error) {
      this.mostrarAlerta('Error', 'Ocurrió un error al registrar tu asistencia.');
    }
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
