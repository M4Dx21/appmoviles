import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';           
  password: string = '';
  passwordType: string = 'password';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService
  ) {}

  async login() {
    try {
      console.log('Intentando iniciar sesión con:', this.email, this.password);
    
      const authUser = await this.authService.login(this.email, this.password);
      console.log('Usuario autenticado:', authUser);
  
      if (this.email.endsWith('@profesor.duoc.cl')) {
        console.log('Redirigiendo a /homep');
        this.router.navigate(['/homep'], { queryParams: { user: authUser?.displayName || this.email } });
      } else {
        console.log('Redirigiendo a /home');
        this.router.navigate(['/home'], { queryParams: { user: authUser?.displayName || this.email } });
      }
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error);
  
      const errorMessage = error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password'
        ? 'Credenciales incorrectas. Por favor, verifica tu correo y contraseña.'
        : 'Credenciales incorrectas.';
  
      this.showError(errorMessage);
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
              this.authService.resetPassword(data.email)
                .then(() => this.showConfirmation())
                .catch((error) => this.showError(error.message));
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
