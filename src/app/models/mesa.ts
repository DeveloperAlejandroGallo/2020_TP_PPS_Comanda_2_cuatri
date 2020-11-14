export class Mesa {

    //mesa -> cliente, comensales, estado, numero, pedido, tipo,


    public cliente;
    public comensales;
    public estado;
    public numero;
    public pedido;
    public tipo;
    public id;

    constructor(cliente: string, comensales: number, estado: string, numero: number, pedido: string, tipo: string,id?:string) {

        this.cliente = cliente;
        this.comensales = comensales;
        this.estado = estado;
        this.numero = numero;
        this.pedido = pedido;
        this.tipo = tipo;
        if(id) this.id = id;

    }

    toJson(){
        return{"cliente": this.cliente, "comensales": this.comensales, "estado": this.estado, "numero": this.numero, "pedido": this.pedido, "tipo": this.tipo, "id":this.id}
    }


}
