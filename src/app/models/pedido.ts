import { Producto } from './producto';
import { Usuario } from './usuario';

export class Pedido {

    //pedidos -> mesa, cliente, productos, total

    public mesa: number;
    public cliente: string;
    public productos: string[];
    public nombres: string[];
    public estadoProductos: string[];
    public cantidades: number[];
    public estado: string;
    public total: number;
    public id: string;

    constructor(mesa: number, cliente: string, productos: string[], nombres: string[], estadoProductos: string[], cantidades: number[], estado: string, total: number, id?: string) {

        this.mesa = mesa;
        this.cliente = cliente;
        this.productos = productos;
        this.nombres = nombres;
        this.estadoProductos = estadoProductos;
        this.cantidades = cantidades;
        this.estado = estado;
        this.total = total;
        if (id) this.id = id;
    }


    toJson() {
        if (this.id)
            return { "mesa": this.mesa, "cliente": this.cliente, "productos": this.productos, "nombres": this.nombres, "estadoProductos": this.estadoProductos, "cantidades": this.cantidades, "estado": this.estado, "total": this.total, "id": this.id }
        else
            return { "mesa": this.mesa, "cliente": this.cliente, "productos": this.productos, "nombres": this.nombres, "estadoProductos": this.estadoProductos, "cantidades": this.cantidades, "estado": this.estado, "total": this.total }

    }

}
