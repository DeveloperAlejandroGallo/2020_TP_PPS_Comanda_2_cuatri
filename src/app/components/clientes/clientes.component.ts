import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {

  @Output() parametroEnviado : EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  enviar(lugar){
    this.parametroEnviado.emit(lugar);
  }


}
