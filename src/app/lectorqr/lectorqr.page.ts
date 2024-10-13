import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-lectorqr',
  templateUrl: './lectorqr.page.html',
  styleUrls: ['./lectorqr.page.scss'],
})
export class LectorqrPage implements OnInit {

  constructor(private router: Router, private alertController: AlertController) {}

  onCodeResult(resultString: string) {
    if (resultString) {
      if (resultString.startsWith('http://') || resultString.startsWith('https://')) {
        window.open(resultString, '_self');
      } else {
        this.showError('El código escaneado no valido');
      }
    }
  }

  async showError(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  goToManualEntry() {
    // Mas adelante para poner manual los códigos QR
  }

  ngOnInit() {
  }

}
