import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/servicios/authentication.service';
// import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {

   
  mostrar;
  mensaje:string;
  usuario:string;
  clave:string;
  public usuarioActivo=false;
  emailVerificado=null;

  constructor(private authService: AuthenticationService,private router: Router) { 
    this.usuarioActivo=false;
  }
  
  ngOnInit() {
    this.authService.currentUser().then(resp=>{
      if(resp != null)
      this.usuarioActivo = true;
      console.log(resp);
      
    }).catch(error=>{
      this.usuarioActivo = false;
      
    });
  }
  
  logOut(){
    
    this.authService.cerrarSesion().then( resp =>{
      this.usuarioActivo=false;
      this.router.navigate(['/home']);
    });
  }



  // async presentLoadingWithOptions() {
  //   const loading = await this.loadingController.create({
  //     spinner: null,
  //     duration: 5000,
  //     message: 'Click the backdrop to dismiss early...',
  //     translucent: true,
  //     cssClass: 'custom-class custom-loading',
  //     backdropDismiss: true
  //   });
  //   await loading.present();

  //   const { role, data } = await loading.onDidDismiss();
  //   console.log('Loading dismissed with role:', role);
  // }



  
  validarUsuario(){
    
    this.authService.iniciarSesion(this.usuario,this.clave).then(resp =>{
  
      console.log(resp);
      let aux=resp;
      this.router.navigate(['/home']);
  
    // emailVerified
      // this.emailVerificado=aux.user.emailVerified;
      // if(this.emailVerificado==true){
      //   this.router.navigate(['/home']);
      // } else {
      //   this.mensaje="Falta verificar la cuenta. Por favor revise su correo";
      //   this.mostrar=true;
      // }
  
      
    }).catch(error =>{
      console.log(error);
      this.mensaje="Correo o contraseña incorrectos. Favor de verificar.";
      this.mostrar=true;
      setTimeout(() => {
        this.mostrar=false;
      }, 2500);
    });
    
  }
  
  
  
  
  cargarUser(tipo){
    switch(tipo){
      case 'User1':{
        this.usuario='admin@admin.com';
        this.clave='111111';
        break;
      }
      case 'User2':{
        this.usuario='invitado@invitado.com';
        this.clave='222222';
        break;
      }
      case 'User3':{
        this.usuario='usuario@usuario.com';
        this.clave='333333';
        break;
      }
      case 'User4':{
        this.usuario='anonimo@anonimo.com';
        this.clave='444444';
        break;
      }
      case 'User5':{
        this.usuario='tester@tester.com';
        this.clave='555555';
        break;
      }
    }
  }
  


  

}
