import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Citas } from '../../model/citas';
import { CitasDTO } from '../../model/citasdto';
import { CitasService } from '../../services/citas.service';

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

    constructor(
        private formbuilder: FormBuilder,
        private servicio: CitasService,
        @Inject(MAT_DIALOG_DATA) public datoedit: any
    ) { }

    ngOnInit(): void {
        
        this.datosetear = this.datoedit;

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
        this.listarCitas();
    }

    obtenerhora(event: any) {
        this.hora = event;
        console.log('HORA ', this.hora);
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
}
