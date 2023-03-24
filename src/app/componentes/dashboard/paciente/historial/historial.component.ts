import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HistoriaService } from '../services/historia.service';
import { Historia } from '../models/historia';
import { Diagnostico } from '../models/diagnostico';
import { Afiliacion } from '../models/afiliacion';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  historiaform: FormGroup;

  numerodocumento:string;
  afiliacion:Afiliacion= new Afiliacion();

  historia:Historia= new Historia();

  diagnostico:Diagnostico= new Diagnostico();
 
  
  constructor(private formbuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public datohistoria : any, private servicio: HistoriaService) { }

  ngOnInit(): void {

        this.buscarafiliacion(this.datohistoria.id)
        this.numerodocumento = this.datohistoria.documento
        
        console.log("AFILIACION ", this.afiliacion);

        this.historiaform = this.formbuilder.group({

            nombre: [this.datohistoria.nombre],
            apellidos: [this.datohistoria.apellidos],
            estadocivil: [this.datohistoria.estadocivil.descripcion], 
            edad: [this.datohistoria.fechanacimiento], 
            sexo: [this.datohistoria.sexo], 
            ocupacion: [this.datohistoria.ocupacion.descripcion],

            psicologa:[],
   
        });



    }

    buscarafiliacion(id:number){

      this.servicio.buscarafiliacion(id).subscribe( res =>{

        if(res){
          this.afiliacion.id = res.id;
          this.afiliacion.estadocierre= res.estadocierre;
          this.afiliacion.fechaafiliacion= res.fechaafiliacion;
          this.afiliacion.paciente = res.paciente;
          this.afiliacion.psicologo = res.psicologo;
          this.afiliacion.tuvocierre = res.tuvocierre;
          this.afiliacion.fechacierrrrr = res.fechacierrrrr;
        }

      })
  
    }

    buscarhistoria(id:number){

      this.servicio.buscarahistoria(id).subscribe( res =>{

        if(res){
          this.historia.id = res.id;
          this.historia.diagnosticoprevio=res.diagnosticoprevio;
          this.historia.historialista=res.historialista;
          this.historia.lugaratencionprevio=res.lugaratencionprevio;
          this.historia.medicacion=res.medicacion;
          this.historia.motivoconsulta=res.motivoconsulta;
          this.historia.paciente=res.paciente;
          this.historia.riesgo=res.riesgo;
          this.historia.tuvomedicacion=res.tuvomedicacion;
          this.historia.tuvoriesgo=res.tuvoriesgo;
          this.historia.tuvoviolencia=res.tuvoviolencia;


          this.servicio.buscardiagnostico(this.historia.id).subscribe(res=>{

            if(res != null){
              this.diagnostico.id=res.id;
              this.diagnostico.conclusion=res.conclusion;
              this.diagnostico.fecha=res.fecha;
              this.diagnostico.historia=res.historia;
              this.diagnostico.niveltranstorno=res.niveltranstorno;
              this.diagnostico.otros=res.otros;
              this.diagnostico.sintomas=res.sintomas;
              this.diagnostico.tienetranstorno=res.tienetranstorno;
            }
          })
        }

      })

    }

  
}
