import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { PushNotificationsService } from "../../servicios/push-notifications.service";

@Component({
  selector: 'app-perfil-duenio',
  templateUrl: './perfil-duenio.component.html',
  styleUrls: ['./perfil-duenio.component.scss'],
})
export class PerfilDuenioComponent implements OnInit {


  @Output() perfilRegistrar : EventEmitter<string> = new EventEmitter<string>();


  constructor(private push: PushNotificationsService) { 
    push.canalAdmin();
  }

  ngOnInit() {}


  public registro(perfil){
    this.perfilRegistrar.emit(perfil);


  }

  public notificacion(perfil) {
    // this.push.enviarNotificacion(perfil);
  }


}
