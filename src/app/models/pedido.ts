import { Producto } from './producto';
import { Usuario } from './usuario';

export class Pedido {

    //pedidos -> mesa, cliente, productos, total

    public mesa: number;
    public cliente: string;
    public productos: string[];
    public estadoProductos: string[];
    public cantidades: number[];
    public estado: string;
    public total: number;
    public id: string;

    constructor(mesa: number, cliente: string, productos: string[], estadoProductos: string[], cantidades: number[], estado: string, total: number, id?: string) {

        this.mesa = mesa;
        this.cliente = cliente;
        this.productos = productos;
        this.estadoProductos = estadoProductos;
        this.cantidades = cantidades;
        this.estado = estado;
        this.total = total;
        if (id) this.id = id;
    }


    toJson() {
        if (this.id)
            return { "mesa": this.mesa, "cliente": this.cliente, "productos": this.productos, "estadoProductos": this.estadoProductos, "cantidades": this.cantidades, "estado": this.estado, "total": this.total, "id": this.id }
        else
            return { "mesa": this.mesa, "cliente": this.cliente, "productos": this.productos, "estadoProductos": this.estadoProductos, "cantidades": this.cantidades, "estado": this.estado, "total": this.total }

    }

}
