import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    fechaNacimiento: null as Date | null,
    matricula: ''
  };

  constructor(private alertController: AlertController) {}

  async onSubmit() {
    const { name, email, password, confirmPassword, matricula, fechaNacimiento } = this.user;

    if (password !== confirmPassword) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Información',
      message: `Nombre: ${name} Correo: ${email} Matrícula: ${matricula} Fecha de Nacimiento: ${fechaNacimiento}`,
      buttons: ['OK']
    });

    await alert.present();
  }

  onClear() {
    this.user = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      fechaNacimiento: null,
      matricula: ''
    };
  }
}
