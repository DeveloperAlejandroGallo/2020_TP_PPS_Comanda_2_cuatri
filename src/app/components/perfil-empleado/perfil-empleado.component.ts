import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-perfil-empleado',
  templateUrl: './perfil-empleado.component.html',
  styleUrls: ['./perfil-empleado.component.scss'],
})
export class PerfilEmpleadoComponent implements OnInit {


  @Output() perfilRegistrar : EventEmitter<string> = new EventEmitter<string>();


  constructor() { }

  ngOnInit() {}


  public registro(perfil){
    this.perfilRegistrar.emit(perfil);


  }
}
