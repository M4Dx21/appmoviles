import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  passwordType: string = 'password';

  constructor(private router: Router, private alertController: AlertController) {}

  login() {
    this.router.navigate(['/home'], { queryParams: { user: this.username } });
  }

  async resetPassword() {
    const alert = await this.alertController.create({
      header: 'Restablecer contraseña',
      message: 'Ingresa tu correo para restablecer la contraseña.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Correo electrónico',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Enviar',
          handler: (data) => {
            if (data.email) {
              //Pa la lógica para enviar el link de restablecer la contraseña al correo
              console.log('El correo ha sido enviado a:', data.email);
              this.showConfirmation();
            } else {
              //Pa agregar validaciones
              console.log('El correo no ha sido ingresado.');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async showConfirmation() {
    const alert = await this.alertController.create({
      header: 'Link enviado',
      message: 'Revisa tu correo para restablecer tu contraseña.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }
}
