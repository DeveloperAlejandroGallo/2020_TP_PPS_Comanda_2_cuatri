import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit {

  public perfilUsuarioActivo;
  public pagina;
  public tipoListado;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.tipoListado = this.route.snapshot.paramMap.get('tipoList');
    this.pagina = "Listado de " + this.tipoListado;
    
  }


  recibirPerfil(e){
    this.perfilUsuarioActivo = e;
  }


}