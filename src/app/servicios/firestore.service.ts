import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private nameCollection="usuarios";

  constructor(private firestore: AngularFirestore) { }

  
  public getUsuarios() {
    return this.firestore.collection(this.nameCollection).snapshotChanges();
  }

  public saveUser(userJson) {
    console.log("save");
    return this.firestore.collection(this.nameCollection).add(userJson);

  }




  // public getUsuarioByCorreo(mail){
  //   this.firestore.collection("usuarios").snapshotChanges().subscribe()
  // }


}