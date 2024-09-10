import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private alertController: AlertController, private router: Router) {}

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
  
    localStorage.setItem('user', JSON.stringify(this.user));
  
    this.router.navigate(['/home'], { queryParams: { user: name } });

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
  onDateChange() {
  }
}
