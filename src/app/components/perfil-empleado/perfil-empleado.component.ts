import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil-empleado',
  templateUrl: './perfil-empleado.component.html',
  styleUrls: ['./perfil-empleado.component.scss'],
})
export class PerfilEmpleadoComponent implements OnInit {


  @Input() tipoUsuarioActivo: string;
  @Output() perfilRegistrar : EventEmitter<string> = new EventEmitter<string>();


  constructor(private navCtrl: NavController) { 
    console.log(this.tipoUsuarioActivo);
  }

  ngOnInit() {
    console.log(this.tipoUsuarioActivo);
  }


  public registro(perfil){
    this.perfilRegistrar.emit(perfil);
  }


  public encuesta(){
    this.navCtrl.navigateForward('/surveys');
  }







}
