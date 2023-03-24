import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HistoriaService } from '../services/historia.service';
import { Historia } from '../models/historia';
import { Diagnostico } from '../models/diagnostico';
import { Afiliacion } from '../models/afiliacion';
import { Usuario } from '../../usuario/model/usuario';
import { Paciente } from '../models/paciente';
import { Riesgo } from '../models/riesgo';
import { DatePipe } from '@angular/common';


@Component({
    selector: 'app-historial',
    templateUrl: './historial.component.html',
    styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

    historiaform: FormGroup;
    numerodocumento: string;
    afiliacion: Afiliacion;
    historia: Historia;
    diagnostico: Diagnostico;


    constructor(private formbuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public datohistoria: any, private servicio: HistoriaService, public datepipe: DatePipe) { }

    ngOnInit(): void {

        this.numerodocumento = this.datohistoria.documento;

        this.historiaform = this.formbuilder.group({

            idpaciente: [this.datohistoria.id],
            nombre: [{ value: this.datohistoria.nombre, disabled: true },],
            apellidos: [{ value: this.datohistoria.apellidos, disabled: true },],
            estadocivil: [{ value: this.datohistoria.estadocivil.descripcion, disabled: true },],
            edad: [{ value: this.datohistoria.fechanacimiento, disabled: true },],
            sexo: [{ value: this.datohistoria.sexo, disabled: true },],
            ocupacion: [{ value: this.datohistoria.ocupacion.descripcion, disabled: true },],

            idafiliacion: [],
            psicologa: [],
            idpsicologa: [],
            fechaafiliacion: [],
            tuvocierre: [],
            fechacierre: [],
            estadocierre: [],

            idhistoria: [],
            motivo: ['', Validators.required],
            mediprevio: [],
            diagprevio: [],
            lugarprevio: [],

            riesgo: ['', Validators.required],

        });

        this.buscarafiliacion(this.datohistoria.id);
        this.buscarhistoria(this.datohistoria.id)




    }

    buscarafiliacion(id: number) {

        this.servicio.buscarafiliacion(id).subscribe(res => {

            if (res) {
                this.afiliacion = { ...res }
                console.log('AFILIACION ENCON ', this.afiliacion);

                this.historiaform.controls['idafiliacion'].setValue(this.afiliacion.id)
                this.historiaform.controls['idpsicologa'].setValue(this.afiliacion.psicologo.id)
                this.historiaform.controls['psicologa'].setValue(this.afiliacion.psicologo.nombres + ' ' + this.afiliacion.psicologo.apellidos);
                this.historiaform.controls['psicologa'].disable();
                this.historiaform.controls['fechaafiliacion'].setValue(this.afiliacion.fechaafiliacion);
                this.historiaform.controls['fechacierre'].setValue(this.afiliacion.fechacierrrrr);
                this.historiaform.controls['estadocierre'].setValue(this.afiliacion.estadocierre);

                
                //this.historiaform.controls['fechaafiliacion'].disable();
                this.historiaform.controls['tuvocierre'].setValue(this.afiliacion.tuvocierre);
                //this.validarcierre(!this.afiliacion.tuvocierre);

            }

        })

    }

    buscarhistoria(id: number) {

        this.servicio.buscarahistoria(id).subscribe(res => {

            if (res) {

                this.historia = { ...res };

                this.historiaform.controls['idhistoria'].setValue(this.historia.id);
                this.historiaform.controls['motivo'].setValue(this.historia.motivoconsulta);
                this.historiaform.controls['mediprevio'].setValue(this.historia.medicacion);
                this.historiaform.controls['diagprevio'].setValue(this.historia.diagnosticoprevio);
                this.historiaform.controls['lugarprevio'].setValue(this.historia.lugaratencionprevio);
                this.historiaform.controls['riesgo'].setValue(this.historia.riesgo.id);

                // this.servicio.buscardiagnostico(this.historia.id).subscribe(res=>{

                //   if(res != null){

                //     this.diagnostico = { ...res };

                //     console.log('DIAGNOSTICO  ', this.diagnostico)

                //   }
                // })
            }

        })

    }


    validarcierre(evento: any) {
        console.log('CIERRE ', evento);
        if (evento) {
            this.historiaform.controls['fechacierre'].disable();
            this.historiaform.controls['estadocierre'].disable();
            this.historiaform.controls['fechacierre'].setValidators(null);
            this.historiaform.controls['estadocierre'].setValidators(null);

        } else {
            this.historiaform.controls['fechacierre'].enable();
            this.historiaform.controls['estadocierre'].enable();
            this.historiaform.controls['fechacierre'].addValidators([Validators.required]);
            this.historiaform.controls['estadocierre'].addValidators([Validators.required]);
            this.historiaform.controls['estadocierre'].setErrors({ required: 'DARO' });
            this.historiaform.controls['fechacierre'].setErrors({ required: 'DARO' });

        }
    }

    actualizarhistoria() {

        // console.log('HISTORIA ', this.historiaform.value)

        // {
        //     "idpaciente": 8,
        //     "idafiliacion": 8,
        //     "idpsicologa": 3,
        //     "fechaafiliacion": "2023-01-17",
        //     "tuvocierre": false,
        //     "fechacierre": null,
        //     "estadocierre": null,
        //     "idhistoria": null,
        //     "motivo": "Terapia de familia",
        //     "mediprevio": null,
        //     "diagprevio": null,
        //     "lugarprevio": null,
        //     "riesgo": 1
        // }

        let afi = new Afiliacion();
        let pacientenuevo = new Paciente(this.historiaform.value['idpaciente']);

        let psicologonuevo = new Usuario();
        psicologonuevo.id = this.historiaform.value['idpsicologa'];
        
        afi.id = this.historiaform.value['idafiliacion'];
        afi.fechaafiliacion = this.historiaform.value['fechaafiliacion'];
        afi.paciente = pacientenuevo;
        afi.tuvocierre = this.historiaform.value['tuvocierre'];
        afi.fechacierrrrr =  this.historiaform.value['fechacierre'];
        afi.estadocierre = this.historiaform.value['estadocierre'];
        afi.psicologo = psicologonuevo

        
        console.log('AFI GUAR ', afi);

        this.servicio.actualizarafiliacion(afi).subscribe(res => {
        })

        
        let hist = new Historia();
        let riesgo = new Riesgo(this.historiaform.value['riesgo']);
       
        hist.diagnosticoprevio = this.historiaform.value['diagprevio'];
        hist.lugaratencionprevio = this.historiaform.value['lugarprevio'];
        hist.medicacion = this.historiaform.value['mediprevio'];
        hist.motivoconsulta = this.historiaform.value['motivo'];
        hist.riesgo = riesgo;
        hist.paciente = pacientenuevo;


        if(this.historiaform.value['idhistoria']!= null){

            hist.id = this.historiaform.value['idhistoria'];

            this.servicio.actualizarhistoria(hist).subscribe(res => {

            })
        }else{

            this.servicio.guardarhistoria(hist).subscribe(res => {

            })
        }

    
    }
}
