import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthenticationService } from 'src/app/servicios/authentication.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';
// import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {


  mostrar;
  mensaje: string;
  usuario: string;
  clave: string;
  usuariosBD = [];
  usuariosClientes = [];
  clientes;
  public usuarioActivo = false;
  emailVerificado = null;

  constructor(private authService: AuthenticationService, private router: Router, private firestore: FirestoreService) {
    this.usuarioActivo = false;
    let user: Usuario;
    firestore.getUsuarios().subscribe((resp: any) => {
      this.usuariosBD = [];
      for (let index = 0; index < resp.length; index++) {
        const element = resp[index];

        user = new Usuario(element.payload.doc.data().nombre, element.payload.doc.data().apellido, element.payload.doc.data().dni, element.payload.doc.data().sexo, element.payload.doc.data().correo, element.payload.doc.data().perfil, element.payload.doc.data().tipo, element.payload.doc.data().aprobado, element.payload.doc.data().cuil, element.payload.doc.data().foto);

        this.usuariosBD.push(user);
      }

      // console.log(this.usuariosBD);

      // for (let index = 0; index < this.usuariosBD.length; index++) {
      //   const element = this.usuariosBD[index];
      //   if (element.perfil == "cliente")
      //     this.usuariosClientes.push(element);
      // }
      this.usuariosClientes = this.usuariosBD.filter(user => user.perfil == "cliente");


      // console.log(this.usuariosClientes);

    });




  }

  ngOnInit() {
    this.authService.currentUser().then(resp => {
      if (resp != null)
        this.usuarioActivo = true;
      console.log(resp);

    }).catch(error => {
      this.usuarioActivo = false;

    });
  }

  logOut() {

    this.authService.cerrarSesion().then(resp => {
      this.usuarioActivo = false;
      this.router.navigate(['/home']);
    });
  }






  validarUsuario() {

    let esCliente = this.usuariosClientes.filter(user => user.correo == this.usuario);
    if (esCliente.length == 1) {
      if (esCliente[0].aprobado == true)
        this.loguearUsuario();
      else {
        this.mensaje = "El cliente no fue aprobado. Debe contactarse con el dueño"
        this.mostrar = true;
        setTimeout(() => {
          this.mostrar = false;
        }, 2500);
      }
    } else
    this.loguearUsuario();

  }




  loguearUsuario() {
    this.authService.iniciarSesion(this.usuario, this.clave).then(resp => {

      console.log(resp);
      let aux = resp;
      this.router.navigate(['/home']);

      // emailVerified
      // this.emailVerificado=aux.user.emailVerified;
      // if(this.emailVerificado==true){
      //   this.router.navigate(['/home']);
      // } else {
      //   this.mensaje="Falta verificar la cuenta. Por favor revise su correo";
      //   this.mostrar=true;
      // }

    }).catch(error => {
      console.log(error);
      this.mensaje = "Correo o contraseña incorrectos. Favor de verificar.";
      this.mostrar = true;
      setTimeout(() => {
        this.mostrar = false;
      }, 2500);
    });
  }






  cargarUser(tipo) {
    switch (tipo) {
      case 'User1': {
        this.usuario = 'admin@admin.com';
        this.clave = '111111';
        break;
      }
      case 'User2': {
        this.usuario = 'cli@cliente.com';
        this.clave = '222222';
        break;
      }
      case 'User3': {
        this.usuario = 'mili@mili.com';
        this.clave = '123123';
        break;
      }
      case 'User4': {
        this.usuario = 'anonimo@anonimo.com';
        this.clave = '444444';
        break;
      }
      case 'User5': {
        this.usuario = 'tester@tester.com';
        this.clave = '555555';
        break;
      }
    }
  }





}
