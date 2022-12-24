import { Paciente } from "../../paciente/models/paciente";
import { Usuario } from '../../usuario/model/usuario';
import { Servicio } from "./servicio";

export class Citas{
    
    id:number;
    fechacita:Date;
    horacita:number;
    modalidad:string;
    psicologo:Usuario;
    paciente:Paciente;
    nota:string;
    estadocita:string;
    servicio:Servicio;  
}



export class CitasResultado{
    hora:number;
    formato:string;
    dato:Citas
}

