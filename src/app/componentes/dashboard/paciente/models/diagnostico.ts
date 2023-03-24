import { Historia } from "./historia";



 export class Diagnostico {

    id:number;
    sintomas:string;
    tienetranstorno:boolean;
    niveltranstorno:string;
    conclusion:string;
    otros:string;
    fecha:Date;
    historia:Historia;


 }