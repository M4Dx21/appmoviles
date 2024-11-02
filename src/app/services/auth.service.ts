import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async register(email: string, password: string): Promise<any> {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      console.log('Usuario registrado:', result);
      return result.user; 
    } catch (error: any) {
      console.error('Error en el registro:', error);
      throw new Error(error.message);
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log('Usuario logueado:', result);
      return result.user;
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error);
      throw new Error(error.message);
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
      console.log('Correo de restablecimiento de contraseña enviado');
    } catch (error: any) {
      console.error('Error al enviar el correo de restablecimiento:', error);
      throw new Error(error.message);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      console.log('Usuario cerró sesión');
      this.router.navigate(['/login']);
    } catch (error: any) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
