import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogAndSignPageRoutingModule } from './log-and-sign-routing.module';

import { LogAndSignPage } from './log-and-sign.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogAndSignPageRoutingModule
  ],
  declarations: [LogAndSignPage]
})
export class LogAndSignPageModule {}
