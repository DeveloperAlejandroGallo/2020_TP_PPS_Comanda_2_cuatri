export class Mesa {

    //mesa -> cliente, comensales, estado, numero, pedido, tipo,


    public cliente;
    public comensales;
    public estado;
    public numero;
    public pedido;
    public tipo;
    public id;

    constructor(comensales: number, estado: string, numero: number, tipo: string,id?:string,cliente?: string, pedido?: string) {

        this.comensales = comensales;
        this.estado = estado;
        this.numero = numero;
        if(tipo) this.tipo = tipo; else this.tipo = null;
        if(pedido) this.pedido = pedido; else this.pedido = null;
        if(cliente) this.cliente = cliente; else this.cliente = null;
        if(id) this.id = id; else this.id = null;

    }

    toJson(){
        return{"cliente": this.cliente, "comensales": this.comensales, "estado": this.estado, "numero": this.numero, "pedido": this.pedido, "tipo": this.tipo, "id":this.id}
    }


}
