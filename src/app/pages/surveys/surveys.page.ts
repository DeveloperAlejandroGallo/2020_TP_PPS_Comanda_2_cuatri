import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.page.html',
  styleUrls: ['./surveys.page.scss'],
})
export class SurveysPage implements OnInit {

  
  public perfilUsuarioActivo;
  public pagina;
  public tipoProducto;
  
  constructor() { }

  ngOnInit() {
  }

}
