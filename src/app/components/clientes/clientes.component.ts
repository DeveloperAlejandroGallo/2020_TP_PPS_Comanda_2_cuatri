import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {

  @Output() parametroEnviado : EventEmitter<string> = new EventEmitter<string>();

  constructor(private navCtrl: NavController) { }

  ngOnInit() {}

  enviar(lugar){
    this.parametroEnviado.emit(lugar);
  }

  public encuesta(){
    this.navCtrl.navigateForward('/surveys');
  }



}
