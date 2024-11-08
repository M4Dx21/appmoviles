import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-lectorqr',
  templateUrl: './lectorqr.page.html',
  styleUrls: ['./lectorqr.page.scss'],
})
export class LectorqrPage {
  constructor(
    private alertController: AlertController,
    private firestoreService: FirestoreService,
    private afAuth: AngularFireAuth
  ) {}

  async onCodeResult(resultString: string) {
    try {
      const data = JSON.parse(resultString);
      const { claseID, expiracion, profesorNombre } = data;
  
      if (Date.now() > expiracion) {
        this.showError('El código QR ha expirado.');
        return;
      }
  
      const user = await this.afAuth.currentUser;
      if (user && user.email && user.email.endsWith('@duocuc.cl')) {
        const estudianteEmail = user.email;
        await this.firestoreService.registrarAsistencia(claseID, estudianteEmail, profesorNombre);
        this.showSuccess('Asistencia confirmada', 'Tu asistencia ha sido registrada.');
      } else {
        this.showError('No se pudo identificar al usuario. Asegúrate de que tienes un correo válido.');
      }
    } catch (error) {
      this.showError('No se pudo procesar el código QR. Asegúrate de que sea válido.');
    }
  }
  async showSuccess(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
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
}
