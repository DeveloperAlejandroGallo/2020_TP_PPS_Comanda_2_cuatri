import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-perfil-empleado',
  templateUrl: './perfil-empleado.component.html',
  styleUrls: ['./perfil-empleado.component.scss'],
})
export class PerfilEmpleadoComponent implements OnInit {


  @Input() tipoUsuarioActivo: string;
  @Output() parametroEnviado : EventEmitter<string> = new EventEmitter<string>();


  constructor(private navCtrl: NavController) { 
  }

  ngOnInit() {
  }


  public enviar(perfil){
    this.parametroEnviado.emit(perfil);
  }


  public encuesta(){
    this.navCtrl.navigateForward('/surveys');
  }







}
