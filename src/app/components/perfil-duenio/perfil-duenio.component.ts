import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-perfil-duenio',
  templateUrl: './perfil-duenio.component.html',
  styleUrls: ['./perfil-duenio.component.scss'],
})
export class PerfilDuenioComponent implements OnInit {


  @Output() perfilRegistrar : EventEmitter<string> = new EventEmitter<string>();


  constructor() { }

  ngOnInit() {}


  public registro(perfil){
    this.perfilRegistrar.emit(perfil);


  }


}
