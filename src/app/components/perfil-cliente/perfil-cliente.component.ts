import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Usuario } from 'src/app/models/usuario';
import { AuthenticationService } from 'src/app/servicios/authentication.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.scss'],
})
export class PerfilClienteComponent implements OnInit {

  usuario;
  waitingList;
  public enListaDeEspera = false;


  constructor(private auth: AuthenticationService,
    private firestore: FirestoreService,
    private barcode: BarcodeScanner) {

    auth.currentUser().then(resp => {
      this.usuario = resp.email;

      let user: Usuario;

      console.log("en el constructor");
      console.log(this.usuario);
      firestore.getListaEspera().subscribe((res: any) => {
        this.waitingList = [];
        for (let index = 0; index < res.length; index++) {
          const element = resp[index];

          user = new Usuario(element.payload.doc.data().nombre, element.payload.doc.data().apellido, element.payload.doc.data().dni, element.payload.doc.data().sexo, element.payload.doc.data().correo, element.payload.doc.data().perfil, element.payload.doc.data().tipo, element.payload.doc.data().aprobado, element.payload.doc.data().cuil, element.payload.doc.data().foto);

          this.waitingList.push(user);
        }

      });

      console.log(this.enListaDeEspera);

      // Swal.fire({
      //   title: 'Bienvenido',
      //   text: 'Estamos verificando el estado de su usuario',
      //   icon: 'info',
      //   showCancelButton: false,
      //   confirmButtonText: 'Adelante',
      //   showConfirmButton: false,
      //   timer: 2000,
      //   timerProgressBar: true})
      //   .then(resultado=>{
  
          if(this.waitingList != null){
  
            let estaEnEspera = this.waitingList.filter(user => user.correo == this.usuario);
            if (estaEnEspera.length == 1)
            this.enListaDeEspera = true;
            else
            this.enListaDeEspera = false;
          }
          
      //   });
  



    })



  }

  ngOnInit() {
  


  }

}
