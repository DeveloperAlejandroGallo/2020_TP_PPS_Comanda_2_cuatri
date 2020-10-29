import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/servicios/authentication.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  
  // public usuarioActivo=false;
  // public listadoUsuarios;
  public perfilUsuarioActivo;
  public pagina;

  // public ucorreoActivo;


  constructor(private authService: AuthenticationService, private router:Router,private firestore:FirestoreService,private navCtrl: NavController) {
    this.pagina="Inicio";

    // authService.currentUser().then(resp=>{
    //   if(resp != null)
    //   {
    //     this.usuarioActivo = true;
    //     this.ucorreoActivo = resp.email;
    //   }
    //     firestore.getUsuarios().subscribe((res:any)=>{   //array de objetos usuario de Firebase
    //       this.listadoUsuarios = res;
          
    //       for (let index = 0; index < this.listadoUsuarios.length; index++) {
    //         const element = this.listadoUsuarios[index];
    //         if(element.payload.doc.data().correo == this.ucorreoActivo){
    //           this.perfilUsuarioActivo = element.payload.doc.data().perfil == 'duenio' ? 'Dueño' : element.payload.doc.data().perfil;
    //         }
    //       }



    //     });

    // }).catch(error=>{
    //   this.usuarioActivo = false;
  
    // });


  }


  recibirPerfil(e){
    this.perfilUsuarioActivo = e;
  }

  recibirPerfilRegistrar(e){
    // console.log(e);
    this.navCtrl.navigateForward('/register/'+e);
  }


  // salir(){
  //   this.authService.cerrarSesion().then(resp =>{
  //     console.log("cerrar sesion");
  //     console.log(resp);
  //     this.router.navigate(['/login']);
  //   });
  // }







}
