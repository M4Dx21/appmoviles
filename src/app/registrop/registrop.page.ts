import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service'; 
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-registrop',
  templateUrl: './registrop.page.html',
  styleUrls: ['./registrop.page.scss'],
})
export class RegistropPage {
  user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    fechaNacimiento: new Date(),
    funcionario: ''
  };

  constructor(
    private alertController: AlertController,
    private router: Router,
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {}

  async onSubmit() {
    const { name, email, password, confirmPassword, funcionario, fechaNacimiento } = this.user;
  
  if (!name.trim()) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'El nombre no puede estar vacío.',
      buttons: ['OK']
    });
    await alert.present();
    return;
  }

  if (!email.endsWith('@profesor.duoc.cl')) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'El correo debe ser @profesor.duoc.cl.',
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
      console.log('Usuario autenticado:', authUser);

      await this.firestoreService.createUser({
        name,
        email,
        password,
        funcionario,
        fechaNacimiento,
        role: 'profesor'
      });
  
      this.router.navigate(['/homep'], { queryParams: { user: name } });

      const alert = await this.alertController.create({
        header: 'Registro Exitoso',
        message: `Nombre: ${name}`,
        buttons: ['OK']
      });

      await alert.present();
    } catch (error: any) {
      const errorMessage = error?.message || 'Ocurrió un error al registrar el profesor.';
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
      funcionario: ''
    };
  }

  onDateChange() {}
}
