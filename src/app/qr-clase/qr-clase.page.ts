import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-qr-clase',
  templateUrl: './qr-clase.page.html',
  styleUrls: ['./qr-clase.page.scss'],
})
export class QrClasePage {
  qrCodeValue: string = '';

  constructor(private alertController: AlertController) {}

  generarQR() {
    const claseID = '12345'; 
    const expiracion = Date.now() + 45 * 60 * 1000;
    this.qrCodeValue = `claseID:${claseID};expiracion:${expiracion}`;
  }

  onCodeResult(resultString: string) {
    try {
      const [claseID, expiracion] = resultString.split(';').map((item) => item.split(':')[1]);
      const fechaExpiracion = parseInt(expiracion, 10);

      if (Date.now() > fechaExpiracion) {
        this.mostrarAlerta('QR Expirado', 'El código QR ya no es válido.');
        return;
      }

      this.mostrarAlerta('Asistencia Confirmada', 'Tu asistencia ha sido registrada exitosamente.');
    } catch (error) {
      this.mostrarAlerta('Error', 'No se pudo procesar el código QR. Asegúrate de que sea válido.');
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
