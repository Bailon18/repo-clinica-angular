
import { Ocupacion } from './ocupacion';
import { EstadoCivil } from './estadoCivil';


export class Paciente {

    id:number;
	nombre:string;
	apellidos:string;
	correo:string;
	telefono:string;
	sexo:string;
	fechanacimiento:Date;
    ocupacion:Ocupacion;
    estadocivil:EstadoCivil;
	documento:string;
	direccion:string;
	distrito:string;

	constructor(id:number){
		this.id = id;
	}
}

