export class Usuario {

    //	usuarios -> nombre, apellido, dni, sexo, (cuil), (foto), perfil, (tipo), correo, (aprobado)
    public nombre:string;
    public apellido:string;
    public dni:string;
    public sexo:string;
    public cuil:string;
    public foto:string;
    public perfil:string;
    public tipo:string;
    public correo:string;
    public aprobado:boolean;
    public id:string;



    constructor(nombre: string, apellido: string, dni: string, sexo: string, correo: string, perfil: string, tipo?: string, aprobado?: boolean, cuil?: string, foto?: string, id?:string) {
        this.nombre=nombre;
        this.apellido=apellido;
        this.dni=dni;
        this.sexo=sexo;
        this.cuil=cuil;
        this.foto=foto;
        this.perfil=perfil;
        this.tipo=tipo;
        this.correo=correo;
        this.aprobado=aprobado;
        this.id=id;
    }

    toJson(){
        return{ "nombre":this.nombre, "apellido":this.apellido, "dni":this.dni, "sexo":this.sexo, "cuil":this.cuil, "foto":this.foto, "perfil":this.perfil, "tipo":this.tipo, "correo":this.correo, "aprobado":this.aprobado }
    }


}
