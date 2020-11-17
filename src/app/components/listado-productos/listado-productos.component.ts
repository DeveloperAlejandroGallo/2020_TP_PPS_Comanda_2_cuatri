import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.scss'],
})
export class ListadoProductosComponent implements OnInit {

  public listadoProductos;
  public listadoBebidas;
  public listadoPlatos;

  public productosPedidos=[];
  public totalPedido=0;

  @Input() tipoListado: string;

  public cantidad = 0;


  constructor(private firestore: FirestoreService) {

    let producto: Producto;
    firestore.getProductos().subscribe((resp: any) => {
      this.listadoProductos = [];
      this.listadoBebidas = [];
      this.listadoPlatos = [];
      for (let index = 0; index < resp.length; index++) {
        const element = resp[index];

        producto = new Producto(element.payload.doc.data().nombre, element.payload.doc.data().descripcion, element.payload.doc.data().tipo, element.payload.doc.data().tiempo, element.payload.doc.data().precio, element.payload.doc.data().fotoUno, element.payload.doc.data().fotoDos, element.payload.doc.data().fotoTres);

        this.listadoProductos.push(producto);

        if (producto.tipo == 'bebida')
          this.listadoBebidas.push(producto);
        else
          this.listadoPlatos.push(producto);

      }



    });



  }

  ngOnInit() { }


  opciones(producto, foto) {
    console.log(producto);

    Swal.fire({
      title: producto.nombre,
      text: producto.descripcion + '. Precio: $' + producto.precio,
      imageUrl: foto,
      imageAlt: 'Foto uno producto',
      input: 'number',
      inputPlaceholder: 'Ingrese cantidad a pedir',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Pedir',
      imageWidth: 400,
      imageHeight: 300,
    }).then(result => {
      if (result.isConfirmed) {
        if (result.value) {
          producto.cantidad = result.value;
          this.productosPedidos.push(producto);
          this.calcularTotal();

        } else {

          Swal.fire('Error', 'Ingrese una cantidad para poder pedir el producto', 'error');

        }

      }
    })
  }





  calcularTotal(){
    this.totalPedido=0;
    this.productosPedidos.forEach(element => {
      this.totalPedido+=element.cantidad*element.precio;
    });
  }

  borrarProducto(item){
    let auxProductos = this.productosPedidos;
    for (let index = 0; index < this.productosPedidos.length; index++) {
      const element = this.productosPedidos[index];
      if(item.nombre == element.nombre){
        auxProductos.splice(index,1);
      }
    }
    this.productosPedidos = auxProductos;
    this.calcularTotal();
  }



}
