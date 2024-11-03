import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
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
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) {}

  async onSubmit() {
    const { name, email, password, confirmPassword, matricula, fechaNacimiento } = this.user;

  if (!name.trim()) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'El nombre no puede estar vacío.',
      buttons: ['OK']
    });
    await alert.present();
    return;
  }

  if (!email.endsWith('@duocuc.cl')) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'El correo debe ser @duocuc.cl.',
      buttons: ['OK']
    });
    await alert.present();
    return;
  }

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

    if (!(fechaNacimiento instanceof Date) || isNaN(fechaNacimiento.getTime())) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, selecciona una fecha de nacimiento válida.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

  
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    const dia = hoy.getDate() - fechaNacimiento.getDate();

    if (edad < 17 || (edad === 17 && (mes < 0 || (mes === 0 && dia < 0)))) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Fecha de nacimiento invalida.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    try {
      const authUser = await this.authService.register(email, password);

      if (authUser) {
        await this.firestoreService.createUser({
          name,
          email,
          password,
          matricula,
          fechaNacimiento,
          role: 'alumno'
        });

        this.router.navigate(['/home'], { queryParams: { user: name } });

        const alert = await this.alertController.create({
          header: 'Registro Exitoso',
          message: `Bienvenido, ${name}.`,
          buttons: ['OK']
        });
        await alert.present();
      }
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
