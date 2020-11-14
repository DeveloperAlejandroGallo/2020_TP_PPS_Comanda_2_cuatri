import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListingPageRoutingModule } from './listing-routing.module';

import { ListingPage } from './listing.page';
import { HomePageModule } from '../home/home.module';
import { ListadoClientesComponent } from 'src/app/components/listado-clientes/listado-clientes.component';
import { ListadoEsperaComponent } from 'src/app/components/listado-espera/listado-espera.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListingPageRoutingModule,
    HomePageModule
  ],
  declarations: [ListingPage,
    ListadoClientesComponent,
    ListadoEsperaComponent]
})
export class ListingPageModule { }
