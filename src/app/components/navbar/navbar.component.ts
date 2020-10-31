import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/servicios/authentication.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {


  public usuarioActivo=false;
  public listadoUsuarios;
  public perfilUsuarioActivo;
  public perfilUsuarioActivoMostrar;

  public ucorreoActivo;

  @Input() pagina: string;
  @Output() perfilUsuarioActivoOutput : EventEmitter<any> = new EventEmitter<any>();

  constructor(private authService: AuthenticationService, private router:Router,private firestore:FirestoreService) {

    authService.currentUser().then(resp=>{
      if(resp != null)
      {
        this.usuarioActivo = true;
        this.ucorreoActivo = resp.email;
      }
        firestore.getUsuarios().subscribe((res:any)=>{   //array de objetos usuario de Firebase
          this.listadoUsuarios = res;
          
          for (let index = 0; index < this.listadoUsuarios.length; index++) {
            const element = this.listadoUsuarios[index];
            if(element.payload.doc.data().correo == this.ucorreoActivo){
              this.perfilUsuarioActivoMostrar='';
              this.perfilUsuarioActivo='';
              this.perfilUsuarioActivo = element.payload.doc.data().perfil;
              this.perfilUsuarioActivoMostrar = element.payload.doc.data().perfil == 'duenio' ? 'Dueño' : element.payload.doc.data().perfil;
              this.perfilUsuarioActivoMostrar = element.payload.doc.data().tipo != undefined? this.perfilUsuarioActivoMostrar+' '+element.payload.doc.data().tipo : this.perfilUsuarioActivoMostrar;
              this.emitirPerfil(this.perfilUsuarioActivo);
            }
          }



        });

    }).catch(error=>{
      this.usuarioActivo = false;
  
    });

    
   }

  ngOnInit() {
    
  }

  salir(){
    this.authService.cerrarSesion().then(resp =>{
      this.router.navigate(['/login']);
    });
  }


  emitirPerfil(perfil){
    this.perfilUsuarioActivoOutput.emit(perfil);
  }

}
