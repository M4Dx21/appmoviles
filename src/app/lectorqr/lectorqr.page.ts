import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-lectorqr',
  templateUrl: './lectorqr.page.html',
  styleUrls: ['./lectorqr.page.scss'],
})
export class LectorqrPage implements OnInit {

  constructor(
    private router: Router,
    private alertController: AlertController,
    private firestoreService: FirestoreService
  ) {}

   async onCodeResult(resultString: string) {
    try {
      console.log('Código QR escaneado:', resultString);

      const [claseID, expiracion] = resultString.split(';').map(item => item.split(':')[1]);
      const fechaExpiracion = parseInt(expiracion, 10);

      if (Date.now() > fechaExpiracion) {
        this.showError('El código QR ya ha expirado');
        return;
      }

      console.log('Clase ID:', claseID);
      console.log('Fecha de Expiración:', new Date(fechaExpiracion));

      this.firestoreService.getCurrentUser().subscribe(
        (currentUser) => {
          console.log('Usuario actual:', currentUser);

          const estudianteName = currentUser?.name;
          if (!estudianteName) {
            this.showError('No se pudo obtener el nombre del estudiante');
            return;
          }

          console.log('Nombre del estudiante:', estudianteName);

          this.firestoreService.registrarAsistencia(estudianteName, claseID)
            .then(() => {
              this.showSuccess('Asistencia registrada exitosamente');
            })
            .catch((error) => {
              console.error('Error al registrar asistencia:', error);
              this.showError('Ocurrió un error al registrar la asistencia');
            });
        },
        (error) => {
          console.error('Error al obtener el usuario actual:', error);
          this.showError('Ocurrió un error al obtener el usuario actual');
        }
      );
    } catch (error) {
      console.error('Error al procesar el código QR:', error);
      this.showError('Ocurrió un error al procesar el código QR');
    }
  }

  async showSuccess(message: string) {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async showError(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  ngOnInit() {}
}
