import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogAndSignPage } from './log-and-sign.page';

const routes: Routes = [
  {
    path: '',
    component: LogAndSignPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogAndSignPageRoutingModule {}
