import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.page.html',
  styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {

  public perfilUsuarioActivo;
  public pagina;
  public tipoProducto;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // this.tipoProducto = this.route.snapshot.paramMap.get('producto');
     this.pagina = "Funciones";
    
  }


  recibirPerfil(e){
    this.perfilUsuarioActivo = e;
  }

}
