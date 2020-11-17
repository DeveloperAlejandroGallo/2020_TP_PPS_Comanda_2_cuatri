import { Producto } from './producto';
import { Usuario } from './usuario';

export class Pedido {

    //pedidos -> mesa, cliente, productos, total

    public mesa: number;
    public cliente: string;
    public productos: string[];
    public total: number;
    public id: string;

    constructor(mesa: number, cliente: string, productos: string[], total: number, id?: string) {

        this.mesa = mesa;
        this.cliente = cliente;
        this.productos = productos;
        this.total = total;
        if (id) this.id = id;
    }


    toJson() {
        if (this.id)
            return { "mesa": this.mesa, "cliente": this.cliente, "productos": this.productos, "total": this.total, "id": this.id }
        else
            return { "mesa": this.mesa, "cliente": this.cliente, "productos": this.productos, "total": this.total }

    }

}