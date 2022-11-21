

export interface Roles{
    id:number;
    descripcion:string,
}

export interface Usuario{
    id:number;
    dni:string,
    nombres:string,
    apellidos: string,
    correo:string, 
    contrasena:string,
    estado:string,
    sexo:string,
    roles: Roles[]
}

