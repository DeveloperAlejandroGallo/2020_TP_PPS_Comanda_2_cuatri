import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogAndSignPageRoutingModule } from './log-and-sign-routing.module';

import { LogAndSignPage } from './log-and-sign.page';
import { LogInComponent } from 'src/app/components/log-in/log-in.component';
import { SignUpComponent } from 'src/app/components/sign-up/sign-up.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogAndSignPageRoutingModule
  ],
  declarations: [LogAndSignPage,
    LogInComponent,
    SignUpComponent]
})
export class LogAndSignPageModule {}
