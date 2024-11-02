import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { User } from '../services/firestore.service';

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
    private firestoreService: FirestoreService
  ) {}

  async login() {
    console.log('Intentando iniciar sesión con:', this.email, this.password);
  
    this.firestoreService.getUserByEmail(this.email).subscribe(
      (usersSnapshot) => {
        console.log('Usuarios obtenidos de Firestore:', usersSnapshot);

        if (usersSnapshot && usersSnapshot.length > 0) {
          const user: User = usersSnapshot[0];
          console.log('Usuario encontrado:', user);
  
          if (user.password.trim() === this.password.trim()) {
            console.log('Contraseña correcta');
  
  
            if (this.email.endsWith('@profesor.duoc.cl')) {
              console.log('Redirigiendo a /homep');
              this.router.navigate(['/homep'], { queryParams: { user: user.name || this.email } });
            } else {
              console.log('Redirigiendo a /home');
              this.router.navigate(['/home'], { queryParams: { user: user.name || this.email } });
            }
            
          } else {
            console.log('Contraseña incorrecta');
            this.showError('Credenciales incorrectas');
          }
        } else {
          console.log('No se encontró una cuenta con este correo');
          this.showError('No se encontró una cuenta con este correo.');
        }
      },
      (error) => {
        console.error('Error en la consulta a Firestore:', error);
        this.showError('Ocurrió un error al iniciar sesión.');
      }
    );
  }
  
  
  
async testGetUserByEmail() {
  try {
    const usersSnapshot = await this.firestoreService.getUserByEmail(this.email).toPromise();
    console.log('Resultado de getUserByEmail:', usersSnapshot);
  } catch (error) {
    console.error('Error al obtener usuario por email:', error);
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
              this.showConfirmation();
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
