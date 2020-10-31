import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthenticationService } from 'src/app/servicios/authentication.service';
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FirestoreService } from 'src/app/servicios/firestore.service';

import { ToastController } from '@ionic/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  public usuarioActivo;


  public tipo;

  public mostrarMensaje=false;
  public mostrarError=false;
  public tituloMensaje;
  public mensaje;

  public nombre;
  public apellido;
  public dni;
  public cuil;
  public usuario;
  public sexo="Femenino";
  public clave;
  public claveDos;

  public datoLeido;
  public formatoLeido;

  public imagenCargada;

  // public tipoEmpleados=['Mozo','Cocinero','Bartender'];
  // public tipoClientes=['Anonimo','Registrado'];

  types = ["PDF417", "QR Code"];

  optionsCamera: CameraOptions = {
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.DATA_URL,
    correctOrientation: true
  }
  
  options: BarcodeScannerOptions = {
    //prompt : "Escaneando", // Android
    resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
    formats : "PDF_417", // default: all but PDF_417 and RSS_EXPANDED
    orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
    disableAnimations : true, // iOS
    disableSuccessBeep: false // iOS and Android
  };


  @Input() perfilAlta:string;



  constructor(private router:Router,
    private auth:AuthenticationService,
    private firestore:FirestoreService,
    private escaner:BarcodeScanner,
    public toastController: ToastController,
    private camera:Camera) {


    }
    
    ngOnInit() {
      if(this.perfilAlta=='empleado')
      this.tipo='Mozo';
      else if(this.perfilAlta=='cliente')
      this.tipo='Anonimo';
      else
      this.tipo='';

      this.imagenCargada="../../../assets/imagenes/whoAmI.png";
  }


  validarRegistro(){
    if(this.nombre != null && this.apellido != null &&
      this.dni != null && this.usuario != null &&
      this.clave != null && this.claveDos != null &&
      this.sexo != null && this.perfilAlta != null &&
      this.cuil != null){

        if(this.dni > 9999999 && this.dni < 99999999){

          if(this.clave == this.claveDos){
            let user = new Usuario(this.nombre,this.apellido,this.dni,this.sexo,this.usuario,this.perfilAlta,this.tipo,null,this.cuil,this.imagenCargada);

            this.firestore.saveUser(user.toJson()).then(resp=>{
              this.auth.registrarCuenta(this.usuario,this.clave).then(res=>{
                Swal.fire({
                  title:'Éxito',
                  text:'El usuario fue dado de alta correctamente',
                  icon:'success'
                }
                ).then(result=>{
                  this.router.navigate(['/home']);
                });
                // this.mostrarNotificacion(true,'El usuario fue dado de alta correctamente');
              }).catch(error=>{
                console.log("rompio el authentication");
                console.log(error);
              });

            }).catch(err=>{
              console.log("FALLO la BD");
              console.log(err);
            });


          }else{
            Swal.fire({
              title:'Error',
              text:'Las claves no coinciden, reingresar.',
              icon:'error'
            }
            ).then(result=>{
              this.clave=null;
              this.claveDos=null;
            });
            // this.tituloMensaje="Error";
            // this.mostrarNotificacion(false,'Las claves no coinciden, reingresar.',1);
          }

        }else{
          Swal.fire({
            title:'Error',
            text:'El dni es incorrecto. Revisar el formato (entre 10000000 y 99999999)',
            icon:'error'
          }
          ).then(result=>{
            this.dni=null;
          });
          // this.tituloMensaje="Error";
          // this.mostrarNotificacion(false,'El dni es incorrecto. Revisar el formato (entre 10000000 y 99999999)',2);
        }

      } else {
        Swal.fire({
          title:'Error',
          text:'Falta ingresar datos, verificar',
          icon:'error'
        }
        )
        // this.tituloMensaje="Error";
        // this.mensaje="Falta ingresar datos, verificar";
        // this.presentToastWithOptions();
        // this.mostrarNotificacion(false,'Falta ingresar datos, verificar',3);
      }


  }


  tomarFoto(){
    this.camera.getPicture(this.optionsCamera).then((imageData) => {

      this.imagenCargada = 'data:image/jpeg;base64,' + imageData;

      // if(imageData !== 'No Image Selected'){
      //   this.imagenesParaCargar.push(this.imagenCargada);
      //   // this.guardarFoto(this.imageURL);
      // }else{
      // }
      // console.log(this.imageURL);
    }).catch((err) => {
      console.log(err);

    });
  }






 escanear(){
  
  this.escaner.scan(this.options).then(barcodeData =>{
    //nroTramite@apellido@nombre@sexo F o M@dni@ejemplar@fecNac@fecVencimiento@xxx cuil (si lo tiene)
    this.datoLeido = barcodeData.text;
    this.formatoLeido = barcodeData.format;
    let probando = this.datoLeido.split('@');
    this.apellido=probando[1];
    this.nombre=probando[2];
    this.dni=probando[4];

  }).catch(err => {
      console.log('Error', err);
      this.datoLeido = err;
    });

 }



 
 
 setSex(value){
   this.sexo=value;
   console.log(this.sexo);
  }

  setType(e){
    this.tipo=e;
    console.log(this.tipo);
  }
  

  
  
  




  
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
    duration: 2000
  });
  toast.present();
}

async presentToastWithOptions() {
  const toast = await this.toastController.create({
    header: this.tituloMensaje,
    message: this.mensaje,
    position: 'middle',
    duration: 3000,
    animated: true,
    // buttons: [
      //   {
    //     side: 'start',
    //     icon: 'star',
    //     text: 'Favorite',
    //     handler: () => {
    //       console.log('Favorite clicked');
    //     }
    //   }, {
      //     text: 'Done',
      //     role: 'cancel',
      //     handler: () => {
    //       console.log('Cancel clicked');
    //     }
    //   }
    // ]
  });
  toast.present();
}



//  mostrarNotificacion(exito, msj,opcion=null) {
//   this.mensaje = msj;
//   if (exito) {
//     this.mostrarMensaje = true;
//     setTimeout(() => {
//       this.mostrarMensaje = false;
//       this.manejarEvento(true);
//     }, 2000);
//   } else {
//     this.mostrarError = true;
//     setTimeout(() => {
//       this.mostrarError = false;
//       this.manejarEvento(false,opcion);
//     }, 2000);
//   }
// }

// manejarEvento(salioBien,opc=null){
//   if(salioBien){
//     this.router.navigate(['/home']);
//   }else{
//     switch(opc){
//       case 1:
//         this.clave=null;
//         this.claveDos=null;
//         break;
//       case 2:
//         this.dni=null;
//         break;
//     }
//   }
// }

}
