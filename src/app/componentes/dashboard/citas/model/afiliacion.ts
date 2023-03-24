import { Paciente } from '../../paciente/models/paciente';
import { Usuario } from '../../usuario/model/usuario';

export class Afiliacion {
    
    id:number;
    estadocierre:string;
    fechaafiliacion:Date;
    tuvocierre:number;
    paciente:Paciente;
    psicologo:Usuario;

}
