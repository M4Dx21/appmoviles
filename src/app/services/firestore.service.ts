import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import { map,switchMap } from 'rxjs/operators';

export interface User {
  name: string;
  email: string;
  password: string;
  matricula?: string;
  fechaNacimiento: Date;
  funcionario?: string;
  role?: string;
}

export interface Clase {
  claseID: string;
  asignatura: string;
  profesorNombre: string;
  expiracion: number;
  asistencias: string[];
}

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  getCurrentUser(): Observable<any> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user && user.email) {
          return this.firestore.collection('users', ref => ref.where('email', '==', user.email).where('role', '==', 'profesor'))
            .valueChanges()
            .pipe(
              map(users => users[0] || null)
            );
        } else {
          return of(null);
        }
      })
    );
  }


  createUser(data: User) {
    return this.firestore.collection('users').add(data)
      .then((res) => {
        console.log("Usuario creado exitosamente:", res);
        return res;
      })
      .catch((error) => {
        console.error("Error al crear el usuario:", error);
        throw error;
      });
  }

  getUserByEmail(email: string): Observable<User[]> {
    console.log('Ejecutando consulta en Firestore para email:', email);
    return this.firestore.collection<User>('users', ref => ref.where('email', '==', email)).valueChanges();
  }

  getUser(id: string): Observable<User | undefined> {
    return this.firestore.collection<User>('users').doc(id).valueChanges();
  }

  updateUser(id: string, data: Partial<User>) {
    return this.firestore.collection('users').doc(id).update(data);
  }

  deleteUser(id: string) {
    return this.firestore.collection('users').doc(id).delete();
  }

  getUsers(): Observable<User[]> {
    return this.firestore.collection<User>('users').valueChanges();
  }

  createClase(clase: Clase) {
    return this.firestore.collection('clases').doc(clase.claseID).set(clase)
      .then(() => {
        console.log('Clase creada exitosamente:', clase);
      })
      .catch((error) => {
        console.error('Error al crear la clase:', error);
        throw error;
      });
  }

  getClaseById(claseID: string): Observable<Clase | undefined> {
    return this.firestore.collection<Clase>('clases').doc(claseID).valueChanges();
  }

  updateClase(claseID: string, data: Partial<Clase>) {
    return this.firestore.collection('clases').doc(claseID).update(data)
      .then(() => {
        console.log('Clase actualizada exitosamente:', claseID);
      })
      .catch((error) => {
        console.error('Error al actualizar la clase:', error);
        throw error;
      });
  }

  registrarAsistencia(claseID: string, estudianteName: string) {
    const asistenciaData = {
      claseID: claseID,
      estudianteName: estudianteName,
      timestamp: new Date()
    };
  
    return this.firestore.collection('asistencias').add(asistenciaData)
      .then(() => console.log('Asistencia registrada con éxito'))
      .catch(error => console.error('Error al registrar la asistencia:', error));
  }
  

  testConnection() {
    this.firestore.collection('test').valueChanges().subscribe(
      data => console.log('Conexión exitosa con Firestore:', data),
      error => console.error('Error al conectar con Firestore:', error)
    );
  }
}
