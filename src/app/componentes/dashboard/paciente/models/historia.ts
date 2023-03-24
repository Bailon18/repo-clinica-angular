import { Diagnostico } from "./diagnostico";
import { Paciente } from './paciente';
import { Riesgo } from "./riesgo";
import { Violencia } from "./violencia";

 export class Historia {

    id:number;
    motivoconsulta:string;
    tuvomedicacion:number;
    medicacion:string;
    tuvoriesgo:number;
    riesgo:Riesgo;
    tuvoviolencia:number;
    historialista:Violencia[];
    lugaratencionprevio:string;
    tuvodianosticoprevio:number;
    diagnosticoprevio:string;
    paciente:Paciente;
    
  
}

 