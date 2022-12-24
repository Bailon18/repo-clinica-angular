

export class Roles{
    id:number;
    descripcion:string;
    seleccion?: boolean;
}

export class Usuario{

    id:number;
    dni:string;
    nombres:string;
    apellidos: string;
    correo:string; 
    contrasena:string;
    estado:string;
    sexo:string;
    roles: Roles[]

}

