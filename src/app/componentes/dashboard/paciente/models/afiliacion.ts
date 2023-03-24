import { Usuario } from "../../usuario/model/usuario";
import { Paciente } from "./paciente";

 export class Afiliacion {

    id:number;

    fechaafiliacion:Date;

    fechacierrrrr:Date;

    psicologo:Usuario;

    tuvocierre:number;

    estadocierre:string;

    paciente:Paciente;


 }