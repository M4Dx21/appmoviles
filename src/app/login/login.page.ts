import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';           
  password: string = '';
  passwordType: string = 'password';

  constructor(private router: Router, private alertController: AlertController) {}

  login() {
    // datos del localStorage
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser.email === this.email && storedUser.password === this.password) {
      this.router.navigate(['/home'], { queryParams: { user: storedUser.name } });
    } else {
      this.showError('Credenciales incorrectas');
    }
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
              // Pa la lógica para enviar el link de restablecer la contraseña al correo
              console.log('El correo ha sido enviado a:', data.email);
              this.showConfirmation();
            } else {
              // Pa agregar validaciones
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

  async showError(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
