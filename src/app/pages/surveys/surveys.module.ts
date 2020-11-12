import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurveysPageRoutingModule } from './surveys-routing.module';

import { SurveysPage } from './surveys.page';
import { HomePageModule } from '../home/home.module';
import { EncuestaEmpleadoComponent } from 'src/app/components/encuesta-empleado/encuesta-empleado.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SurveysPageRoutingModule,
    HomePageModule
  ],
  declarations: [SurveysPage,
  EncuestaEmpleadoComponent]
})
export class SurveysPageModule {}
