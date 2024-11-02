import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';

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
    fechaNacimiento: new Date(),
    matricula: ''
  };

  constructor(
    private alertController: AlertController,
    private router: Router,
    private firestoreService: FirestoreService 
  ) {}

  async onSubmit() { 
    const { name, email, password, confirmPassword, matricula, fechaNacimiento } = this.user;

    if (password.length < 8) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'La contraseña debe tener al menos 8 caracteres.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (password !== confirmPassword) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    try {
      await this.firestoreService.createUser({
        name,
        email,
        password,
        matricula,
        fechaNacimiento
      });

      this.router.navigate(['/home'], { queryParams: { user: name } });

      const alert = await this.alertController.create({
        header: 'Registro Exitoso',
        message: `Bienvenido, ${name}.`,
        buttons: ['OK']
      });
      await alert.present();
    } catch (error: any) {
      const errorMessage = error?.message || 'Ocurrió un error durante el registro.';
      const alert = await this.alertController.create({
        header: 'Error en el Registro',
        message: `Ocurrió un error: ${errorMessage}`,
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  onClear() {
    this.user = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      fechaNacimiento: new Date(),
      matricula: ''
    };
  }

  onDateChange() {
  }
}
