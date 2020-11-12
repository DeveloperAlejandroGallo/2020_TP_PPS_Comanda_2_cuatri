import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private collectionUsers="usuarios";
  private collectionListaEspera="listaDeEspera";
  private collectionPendientes="pendientesAprobacion";
  private collectionProductos="productos";
  private collectionEncuestas="encuestas";

  constructor(private firestore: AngularFirestore) { }

  //#region  GET

  public getUsuarios() {
    return this.firestore.collection(this.collectionUsers).snapshotChanges();
  }

  public getListaDeEspera() {
    return this.firestore.collection(this.collectionListaEspera).snapshotChanges();
  }

  public getPendientesAprobar() {
    return this.firestore.collection(this.collectionPendientes).snapshotChanges();
  }

  public getProductos() {
    return this.firestore.collection(this.collectionProductos).snapshotChanges();
  }

  public getEncuestas() {
    return this.firestore.collection(this.collectionEncuestas).snapshotChanges();
  }

//#endregion



//#region SAVE

  public saveUser(userJson) {
    console.log("save");
    return this.firestore.collection(this.collectionUsers).add(userJson);

  }
  
  public saveListaDeEspera(userJson){
    console.log("save listaDeEspera");
    return this.firestore.collection(this.collectionListaEspera).add(userJson);
    
  }
  
  public savePendientesAprobar(userJson) {
    console.log("save pendientesAprobacion");
    return this.firestore.collection(this.collectionPendientes).add(userJson);

  }
  
  public saveProductos(userJson) {
    console.log("save productos");
    return this.firestore.collection(this.collectionProductos).add(userJson);

  }
  
  public saveEncuestas(userJson) {
    console.log("save encuestas");
    return this.firestore.collection(this.collectionEncuestas).add(userJson);

  }


  //#endregion




}
