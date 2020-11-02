import { Injectable } from '@angular/core';
import { Push, PushObject, PushOptions } from "@ionic-native/push/ngx";

@Injectable({
  providedIn: 'root'
})
export class PushNotificationsService {

  constructor(private push: Push) { }

  opciones: PushOptions = {
    android: {
      sound: true,
      vibrate: true,
      forceShow: true,
    },
    ios: {},
    windows: {},
    browser: {}
  }

  objetoPush: PushObject = this.push.init(this.opciones);



  VerificarPermisos() {
    this.push.hasPermission().then(res => {
      if (res.isEnabled) {
        console.log("Permisos de celulares");
      }
      else {
        console.log("No hay permisos de notificaciones.");
      }
    });
  }

  canalAdmin() {
    this.push.createChannel({
      id: "canalAdmin",
      description: "Canal de notificaciones para administradores",
      importance: 1,
      badge: true
    }).then(() => console.log("Canal creado"));
  }

  enviarNotificacion(notificacion) {
    //notificacion va a tener el valor del evento - ejemplo "registro"
    this.objetoPush.on(notificacion).subscribe(notif => console.log("Notificación recibida"));
  }

}
