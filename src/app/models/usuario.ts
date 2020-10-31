export class Usuario {

    //	usuarios -> nombre, apellido, dni, sexo, (cuil), (foto), perfil, (tipo), correo, (aprobado)
    private nombre:string;
    private apellido:string;
    private dni:string;
    private sexo:string;
    private cuil:string;
    private foto:string;
    private perfil:string;
    private tipo:string;
    private correo:string;
    private aprobado:boolean;



    constructor(nombre: string, apellido: string, dni: string, sexo: string, correo: string, perfil: string, tipo?: string, aprobado?: boolean, cuil?: string, foto?: string) {
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
    }

    toJson(){
        return{ "nombre":this.nombre, "apellido":this.apellido, "dni":this.dni, "sexo":this.sexo, "cuil":this.cuil, "foto":this.foto, "perfil":this.perfil, "tipo":this.tipo, "correo":this.correo, "aprobado":this.aprobado }
    }


}
