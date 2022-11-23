

export interface Roles{
    id:number;
    descripcion:string,
    seleccion?: boolean
}

export interface Usuario{

    id:string,
    dni:string,
    nombres:string,
    apellidos: string,
    correo:string, 
    contrasena:string,
    estado:string,
    sexo:string,
    roles: Roles[]
}

