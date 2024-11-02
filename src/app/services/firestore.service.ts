import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

export interface User {
  name: string;
  email: string;
  password: string;
  matricula?: string;
  fechaNacimiento: Date;
  funcionario?: string;
  role?: String;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

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
  
testConnection() {
  this.firestore.collection('test').valueChanges().subscribe(
    data => console.log('Conexión exitosa con Firestore:', data),
    error => console.error('Error al conectar con Firestore:', error)
  );
}



}
