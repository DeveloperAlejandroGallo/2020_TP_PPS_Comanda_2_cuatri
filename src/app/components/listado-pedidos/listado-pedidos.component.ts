import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Pedido } from 'src/app/models/pedido';
import { Producto } from 'src/app/models/producto';
import { Usuario } from 'src/app/models/usuario';
import { AuthenticationService } from 'src/app/servicios/authentication.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listado-pedidos',
  templateUrl: './listado-pedidos.component.html',
  styleUrls: ['./listado-pedidos.component.scss'],
})
export class ListadoPedidosComponent implements OnInit {

  public listadoProductos = [];
  public listadoBebidas = [];
  public listadoPlatos = [];

  public listadoPedidos = [];
  public listadoPedidosNoCerrados = [];
  public listadoPedidosPendientes = [];

  public listadoProductosPedidos = [];
  public listadoProductosPedidosPorTipo = [];
  public listadoBebidasPedidos = [];
  public listadoPlatosPedidos = [];

  public listProductosPorPedido = [];

  public usuarioActivoCorreo;
  public usuarioBDActivo;
  public usuarioBDActivoTIPO;

  @Input() tipoListado: string;


  constructor(private auth: AuthenticationService, private firestore: FirestoreService, private navCtrl: NavController) {

    let producto: Producto;
    firestore.getProductos().subscribe((resp: any) => {
      this.listadoProductos = [];
      this.listadoBebidas = [];
      this.listadoPlatos = [];
      for (let index = 0; index < resp.length; index++) {
        const element = resp[index];
        producto = new Producto(element.payload.doc.data().nombre, element.payload.doc.data().descripcion, element.payload.doc.data().tipo, element.payload.doc.data().tiempo, element.payload.doc.data().precio, element.payload.doc.data().fotoUno, element.payload.doc.data().fotoDos, element.payload.doc.data().fotoTres, element.payload.doc.data().cantidad, element.payload.doc.id);
        this.listadoProductos.push(producto);

        if (producto.tipo == 'bebida')
          this.listadoBebidas.push(producto);
        else
          this.listadoPlatos.push(producto);
      }
      console.log("cargo productos");
    });


    let pedido: Pedido;
    firestore.getPedidos().subscribe((resp: any) => {
      this.listadoPedidos = [];
      this.listadoPedidosNoCerrados=[];
      this.listadoPedidosPendientes=[];
      for (let index = 0; index < resp.length; index++) {
        const element = resp[index];
        pedido = new Pedido(element.payload.doc.data().mesa, element.payload.doc.data().cliente, element.payload.doc.data().productos, element.payload.doc.data().nombres, element.payload.doc.data().estadoProductos, element.payload.doc.data().cantidades, element.payload.doc.data().estado, element.payload.doc.data().total, element.payload.doc.id);
        this.listadoPedidos.push(pedido);
        if (pedido.estado != 'cerrado')
          this.listadoPedidosNoCerrados.push(pedido);
        if (pedido.estado == 'pendiente')
          this.listadoPedidosPendientes.push(pedido);
      }
      this.decidirPedidoQueCorresponde();
      console.log("cargo pedidos");
    });

    auth.currentUser().then(resp => {
      this.usuarioActivoCorreo = resp.email;
      let user: Usuario;
      firestore.getUsuarios().subscribe((resp: any) => {
        for (let index = 0; index < resp.length; index++) {
          const element = resp[index];
          user = new Usuario(element.payload.doc.data().nombre, element.payload.doc.data().apellido, element.payload.doc.data().dni, element.payload.doc.data().sexo, element.payload.doc.data().correo, element.payload.doc.data().perfil, element.payload.doc.data().tipo, element.payload.doc.data().aprobado, null, element.payload.doc.data().foto, element.payload.doc.id, element.payload.doc.data().enMesa);
          if (user.correo == this.usuarioActivoCorreo) {
            console.log(user);
            this.usuarioBDActivo = user;
            this.usuarioBDActivoTIPO = this.usuarioBDActivo.tipo;
          }
        }
      });
      console.log("cargo usuario");
    });


  }

  ngOnInit() { }


  decidirPedidoQueCorresponde() {
    this.listadoProductosPedidos = [];
    this.listadoProductosPedidosPorTipo = [];
    this.listadoPedidosPendientes.forEach(element => {  // cada pedido
      let producto;
      let obj;
      for (let index = 0; index < element.productos.length; index++) { // cada producto del pedido
        const pedProd = element.productos[index];
        for (let indice = 0; indice < this.listadoProductos.length; indice++) { // recorro todos los productos
          const prodProductos = this.listadoProductos[indice];
          if (prodProductos.id == pedProd) { // cuando encuentro el id del producto del pedido en productos
            obj = new Object();
            obj.idProducto = pedProd;
            obj.nombre = prodProductos.nombre;
            obj.idPedido = element.id;
            obj.cantidad = element.cantidades[index];
            obj.tipoProd = prodProductos.tipo;
            obj.estadoProducto = element.estadoProductos[index];
            obj.foto = prodProductos.fotoDos;
            this.listadoProductosPedidos.push(obj);
            break;
          }
        }
      }
    });

    this.listadoProductosPedidos.forEach(element => {
      // console.log(this.usuarioBDActivoTIPO);
      // console.log(element.tipoProd);
      if (element.estadoProducto == 'pendiente') {
        if (element.tipoProd == 'bebida' && this.usuarioBDActivoTIPO == 'bartender')
          this.listadoProductosPedidosPorTipo.push(element);
        if (element.tipoProd == 'plato' && this.usuarioBDActivoTIPO == 'cocinero')
          this.listadoProductosPedidosPorTipo.push(element);
      }
    });

    console.log(this.listadoProductosPedidos);
    console.log(this.listadoProductosPedidosPorTipo);

  }


  finalizar(producto) {

    // let todoListo=false;
    producto.estadoProducto = 'finalizado';

    this.listadoPedidosPendientes.forEach(element => {
      if (element.id == producto.idPedido) {  // busco el pedido para actualizar el estado del producto en la BD
        for (let index = 0; index < element.productos.length; index++) {
          const productoDelPedido = element.productos[index];
          if (productoDelPedido == producto.idProducto && element.estadoProductos[index] == 'pendiente') {
            element.estadoProductos[index] = 'finalizado';

            Swal.fire('Perfecto!', 'Terminó la preparación del producto correctamente.', 'success');
            this.firestore.updateBD(element.id, element.toJson(), 'pedidos').then(res => {
              console.log("Magicamente funcionó");
              this.verificarEstadoFinal(element.id);

            }).catch(err => {
              console.log("Era más lógico que rompa: " + err);
            })

            break;
          }
        }
      }
    });

  }


  verificarEstadoFinal(idPedido){
    let todoListo=true;
    this.listadoPedidos.forEach(element => {
      if(element.id == idPedido){
        element.estadoProductos.forEach(estados => {
          if(estados != 'finalizado'){
            todoListo=false;
          }
        });
        if(todoListo){
          element.estado='finalizado';
          this.firestore.updateBD(element.id,element.toJson(),'pedidos').then(res=>{
            console.log("pedido listo para ser entregado");
          });
        }
      }
    });
  }





  confirmar(pedido){
    pedido.estado='pendiente';
    this.firestore.updateBD(pedido.id,pedido.toJson(),'pedidos').then(resp=>{
      Swal.fire('Muchas gracias','El pedido fue confirmado y se enviará a los sectores correspondientes','success');
    });
  }

  



}
