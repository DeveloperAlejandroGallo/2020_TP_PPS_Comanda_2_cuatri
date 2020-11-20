import { Injectable } from '@angular/core';

import { FCM } from "@ionic-native/fcm/ngx";
import { Usuario } from '../models/usuario';
import { AuthenticationService } from './authentication.service';
import { FirestoreService } from './firestore.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(private fcm: FCM,
    private authService: AuthenticationService,
    private firestore: FirestoreService,
    private http: HttpClient) { }

  headers = new HttpHeaders({
    'Content-Type': "application/json",
    'Authorization': 'key=AAAAq8JVHAk:APA91bFzYee6QHfW1bmETVahitxckTwX2-41OAMI5AM6gtQiaI1PUf_K-xQwwkfO0uPA7nNNGMF6McmHf-KSDaCyyuq-4G4bCd761yOBekgXjd0AkyFovzfZr6ck6rMpa-iKGK_HpyaO'
  })

  getToken() {
    this.fcm.getToken().then(token => {
      this.saveToken(token);
    }).catch(error => {
      console.log("Error getting token: " + error);
    });
  }

  private saveToken(token) {
    if (!token) return;

    const data = {
      token,
      userId: this.authService.currentUser().then(res => {
        return res.uid;
      })
    };

    return this.firestore.setData('Dispositivos', data, data.userId);
  }

  // notificationSetup() {
  //     this.fcm.onNotification().subscribe(data => {
  //       this.smartAudioService.play("notification")
  //       if(!data.wasTapped){
  //         //Aplicación en primer plano
  //         this.notificationService.presentToast(data.body,"primary","top", true);
  //       }
  //     }, error => {
  //       console.log("Error: " + error);
  //     })
  // }

  getTokensByProfile(userProfile) {
    return new Promise((resolve) => {
      this.firestore.getUsuarios().subscribe(users => {
        new Promise((resolve) => resolve(users.map(user => user.payload.doc.data() as Usuario).filter(user => user.Perfil == userProfile)))
          .then((usersByProfile: any[]) => {
            this.firestore.getDevices('Dispositivos').subscribe(devices => {
              let devicesByProfile = devices.map(device => device.payload.doc.data() as any)
                .filter(device => usersByProfile.some(user => user.id == device.userId))
                .map(device => device.token);
              if (usersByProfile.length > 0)
                resolve(devicesByProfile);
            });
          });
      });
    });
  }

  getTokensById(id) {
    return new Promise((resolve) => {
      this.firestore.getOne('Dispositivos', id).then(device => {
        let deviceById = device.data().token;
        resolve(deviceById);
      });
    });
  }

  sendNotification(title: string, message: string, to: unknown, redirectTo?: string) {
    let body = {
      "notification": {
        "title": title,
        "body": message,
        "sound": "default",
        "click_action": "FCM_PLUGIN_ACTIVITY",
        "icon": "fcm_push_icon"
      },
      "data": {
        "redirectTo": redirectTo
      },
      //Un solo ID, topico o grupo
      //"to": to,
      // Multiples IDs
      "registration_ids": to,
      "priority": "high"
    }

    return this.http.post("https://fcm.googleapis.com/fcm/send", body, { headers: this.headers }).subscribe();
  }



}
