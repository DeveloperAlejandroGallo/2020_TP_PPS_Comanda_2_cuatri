import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { PerfilDuenioComponent } from 'src/app/components/perfil-duenio/perfil-duenio.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage,NavbarComponent,PerfilDuenioComponent]
})
export class HomePageModule {}
