import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from '../../../usuario/model/usuario';
import { Citas } from '../../model/citas';
import { CitasDTO } from '../../model/citasdto';
import { CitasService } from '../../services/citas.service';
import { Paciente } from '../../../paciente/models/paciente';
import { Servicio } from '../../model/servicio';
import swall from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-detallecita',
    templateUrl: './detallecita.component.html',
    styleUrls: ['./detallecita.component.css'],
})
export class DetallecitaComponent implements OnInit {
    citaForm: FormGroup;
    datosetear: CitasDTO;
    listacitasresul: any[];
    public citas = new Citas();
    fecha: Date;
    hora: number;
    selectedOption: any;
    nombrepac:string;
    horabase:number;
    estadocitabase:string;

    fechabase:Date;


    idCita: number;
    idpsicologodefault :number;

    constructor(
        private formbuilder: FormBuilder,
        private servicio: CitasService,
        @Inject(MAT_DIALOG_DATA) public datoedit: any,
        private dialog : MatDialogRef<DetallecitaComponent>,
        public datepipe: DatePipe
    ) { }

    ngOnInit(): void {
        
        this.datosetear = this.datoedit;

        this.idCita = this.datosetear.id;
        this.nombrepac = this.datosetear.pacientenombres;
        this.idpsicologodefault = this.datosetear.psicologoid;
        this.horabase = this.datosetear.horacita;
        this.estadocitabase = this.datosetear.estadocita;
        this.fechabase = this.datosetear.fechacita;


        console.log("DATOS EDITAR ",  this.datosetear)

        // {
        //     "id": 18,
        //     "fechacita": "2023-01-21",
        //     "horacita": 11,
        //     "modalidad": "Virtual",
        //     "psicologonombre": "Bailon Paucar Montes",
        //     "psicologoid": 1,
        //     "idpaciente": 16,
        //     "pacientenombres": "Mana Mana Mana",
        //     "nota": "",
        //     "estadocita": "Pendiente",
        //     "servicionombre": 2
        // }

        let fecha = new Date(this.datosetear.fechacita);
        fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());
        this.fecha = fecha;

        this.citaForm = this.formbuilder.group({
            idpsicologo: [this.datosetear.psicologoid, Validators.required],
            idpaciente: [this.datosetear.idpaciente, Validators.required],
            fechacita: [this.fecha, Validators.required], //text -> fecha automatico
            hora: [this.datosetear.horacita, Validators.required], // text -> hora automatico
            modalidad: [this.datosetear.modalidad, Validators.required], // combobox - manual -> Virtual Presencial
            psicologo: [{ value: this.datosetear.psicologonombre, disabled: true }], // text -> paciente automatico
            paciente: [{ value: this.datosetear.pacientenombres, disabled: true }], //
            nota: [this.datosetear.nota],
            estadocita: [this.datosetear.estadocita, Validators.required],
            servicios: [
                this.datosetear.servicionombre.toString(),
                Validators.required,
            ],
        });

        this.listacitasresul = [
            { hora: 1, formato: '1:00 AM', dato: this.citas },
            { hora: 1, formato: '2:00 AM', dato: this.citas },
            { hora: 1, formato: '3:00 AM', dato: this.citas },
            { hora: 1, formato: '4:00 AM', dato: this.citas },
            { hora: 1, formato: '5:00 AM', dato: this.citas },
            { hora: 1, formato: '6:00 AM', dato: this.citas },
            { hora: 1, formato: '7:00 AM', dato: this.citas },
            { hora: 1, formato: '8:00 AM', dato: this.citas },
            { hora: 1, formato: '9:00 AM', dato: this.citas },
            { hora: 1, formato: '10:00 AM', dato: this.citas },
            { hora: 1, formato: '11:00 AM', dato: this.citas },
            { hora: 1, formato: '12:00 PM', dato: this.citas },
            { hora: 1, formato: '13:00 PM', dato: this.citas },
            { hora: 1, formato: '14:00 PM', dato: this.citas },
            { hora: 1, formato: '15:00 PM', dato: this.citas },
            { hora: 1, formato: '16:00 PM', dato: this.citas },
            { hora: 1, formato: '17:00 PM', dato: this.citas },
            { hora: 1, formato: '18:00 PM', dato: this.citas },
            { hora: 1, formato: '19:00 AM', dato: this.citas },
        ];

        this.listarCitas();
    }

    obtenerfecha(event: any) {
        this.fecha = event.value;

        let fechaactual = this.datepipe.transform(this.fecha,"yyyy-MM-dd");

        if(fechaactual != this.fechabase.toString()){
            this.citaForm.controls['estadocita'].setValue("Reprogramado");
        }else{
            this.citaForm.controls['estadocita'].setValue(this.estadocitabase);
        }
        
        console.log('FECHA ACTUAL ', fechaactual)
        console.log("FECHA BASE ", this.fechabase);
        this.listarCitas();
    }

    obtenerhora(event: any) {

        this.hora = event;

        let horaactual = parseInt(this.citaForm.value['hora'].formato.slice(0,2));
        
        if(horaactual != this.horabase){
            this.citaForm.controls['estadocita'].setValue("Reprogramado");
        }else{
            this.citaForm.controls['estadocita'].setValue(this.estadocitabase);
        }

        //console.log('HORA ', this.hora);
    }

    listarCitas() {
        let horaselecc = this.datosetear.horacita;

        // consulta para llenar el combobox de horario
        this.servicio.buscarCitas(this.datosetear.psicologoid, this.fecha).subscribe((res) => {
                this.listacitasresul = [
                    { hora: 1, formato: '1:00 AM', dato: this.citas },
                    { hora: 1, formato: '2:00 AM', dato: this.citas },
                    { hora: 1, formato: '3:00 AM', dato: this.citas },
                    { hora: 1, formato: '4:00 AM', dato: this.citas },
                    { hora: 1, formato: '5:00 AM', dato: this.citas },
                    { hora: 1, formato: '6:00 AM', dato: this.citas },
                    { hora: 1, formato: '7:00 AM', dato: this.citas },
                    { hora: 1, formato: '8:00 AM', dato: this.citas },
                    { hora: 1, formato: '9:00 AM', dato: this.citas },
                    { hora: 1, formato: '10:00 AM', dato: this.citas },
                    { hora: 1, formato: '11:00 AM', dato: this.citas },
                    { hora: 1, formato: '12:00 PM', dato: this.citas },
                    { hora: 1, formato: '13:00 PM', dato: this.citas },
                    { hora: 1, formato: '14:00 PM', dato: this.citas },
                    { hora: 1, formato: '15:00 PM', dato: this.citas },
                    { hora: 1, formato: '16:00 PM', dato: this.citas },
                    { hora: 1, formato: '17:00 PM', dato: this.citas },
                    { hora: 1, formato: '18:00 PM', dato: this.citas },
                    { hora: 1, formato: '19:00 AM', dato: this.citas },
                ];

                if (res.length > 0) {
                    for (let i in res) {
                        this.listacitasresul[res[i].horacita - 1].dato = res[i];
                    }
                    this.listacitasresul = this.listacitasresul.splice(7, 20);
                } else {
                    this.listacitasresul = this.listacitasresul.splice(7, 20);
                }

                for (let index = 0; index < this.listacitasresul.length; index++) {
                    if (parseInt(this.listacitasresul[index].formato) == horaselecc) {
                        this.selectedOption = this.listacitasresul[index];
                    }
                }
            });
    }

    actualizarCita(){

        if(this.citaForm.valid){

            let nuevacita = new Citas();

            nuevacita.id= this.idCita

            let nuevospicologo = new Usuario();
            nuevospicologo.id = this.citaForm.value['idpsicologo'];
            let nuevopaciente = new Paciente(this.citaForm.value['idpaciente']);
            let nuevoservicio = new Servicio(parseInt(this.citaForm.value['servicios']));
            nuevacita.fechacita = this.citaForm.value['fechacita'];
            nuevacita.horacita = parseInt(this.citaForm.value['hora'].formato.slice(0,2));
            nuevacita.modalidad = this.citaForm.value['modalidad'];
            nuevacita.paciente = nuevopaciente;
            nuevacita.psicologo = nuevospicologo;
            nuevacita.nota = this.citaForm.value['nota'];
            nuevacita.estadocita = this.citaForm.value['estadocita'];
            nuevacita.servicio = nuevoservicio;


            this.servicio.actualizarCita(nuevacita).subscribe(respues => {

                
                if(respues != null){

                    this.dialog.close()
                    swall.fire({
                      icon: 'success',
                      confirmButtonColor:'#0275d8',
                      html:  `Se actualizo correctamente cita del paciente:  <strong>${this.nombrepac}</strong>`,
                    })
      
                }else{

                    this.dialog.close()
                    swall.fire({
                      icon: 'warning',
                      confirmButtonColor:'#0275d8',
                      html:  `Ocurrio un erro no se puede actualizar la cita`,
                    })
                }
            })

        }
    }
}
