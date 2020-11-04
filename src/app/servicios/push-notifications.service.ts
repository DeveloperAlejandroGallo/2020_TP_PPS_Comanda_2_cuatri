import { Injectable } from '@angular/core';
import { Push, PushObject, PushOptions } from "@ionic-native/push/ngx";

@Injectable({
  providedIn: 'root'
})
export class PushNotificationsService {

  constructor(private push: Push) {

    this.VerificarPermisos();
  }

  setup() {

    const opciones: PushOptions = {
      android: {
        senderID: "737699765257"
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      }
    }

    const objetoPush: PushObject = this.push.init(opciones);


    objetoPush.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

    objetoPush.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    objetoPush.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }


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


}
