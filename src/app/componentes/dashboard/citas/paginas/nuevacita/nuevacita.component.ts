import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import swall from 'sweetalert2';
import { CitasService } from '../../services/citas.service';
import { Paciente } from '../../../paciente/models/paciente';
import { Citas } from '../../model/citas';
import { Usuario } from '../../../usuario/model/usuario';
import { Servicio } from '../../model/servicio';


@Component({
  selector: 'app-nuevacita',
  templateUrl: './nuevacita.component.html',
  styleUrls: ['./nuevacita.component.css']
})
export class NuevacitaComponent implements OnInit {

  citaForm !: FormGroup;
  datosetear:any[];
  nombrepaciente:string= 'Paciente no seleccionado';
  fechaseleccionado:Date;
  horaseleccionado:number;
  pacienteseleccionado:number;
 
  constructor(private formbuilder: FormBuilder, 
    private servicio: CitasService, private dialog : MatDialogRef<NuevacitaComponent>)
  {
  }


  ngOnInit(): void {

      this.datosetear  = JSON.parse(localStorage.getItem('datoscita')!) || [];
      //console.log("DATOS A SETEAR ", this.datosetear)

      // [3, 'Herlly Arteaga Sedano', '2022-12-15T05:00:00.000Z', '11:00 AM']
      this.fechaseleccionado = this.datosetear[2];
      this.horaseleccionado =  Number.parseInt(this.datosetear[3].slice(0,2));
      let fecha = new Date(this.fechaseleccionado).toLocaleDateString('en-CA')
      //console.log("FECHAAAAAA ", fecha)

      this.citaForm = this.formbuilder.group({
        
        idpsicologo:[this.datosetear[0]],
        idpaciente : [''],
        fechacita: [fecha], //text -> fecha automatico
        hora:[this.datosetear[3]], // text -> hora automatico
        modalidad: [''], // combobox - manual -> Virtual Presencial
        psicologo:[this.datosetear[1],Validators.required], // text -> paciente automatico
        paciente:['',Validators.required], //
        nota:[''],
        estadocita:['Pendiente', Validators.required],
        servicios:['', Validators.required],
        // nombrepaciente:new FormControl({ value: "Bailon", disabled: true }),
        // apellidospaciente:new FormControl({ value: "Paucar Montes", disabled: true })
        
      })
    }


  buscarusuario(event: any){

    this.nombrepaciente = 'Paciente no seleccionado';

    const dni = (event.target as HTMLInputElement).value;
    console.log("dato "+dni)

    if(dni.length == 8){

      // consola 
      this.servicio.buscarpacientedni(dni).subscribe(pac => {
        
        if(pac != null ){
          this.nombrepaciente =  pac.nombre + " " +pac.apellidos;
          this.pacienteseleccionado= pac.id;
        }
        
      })
    }
  }

  guardarPaciente():void{

  //   {
  //     "fechacita": "2022-12-19",
  //     "horacita": 9,
  //     "modalidad": "Virtual",
  //     "psicologo": {
  //         "id": 3
  //     },
  //     "paciente": {
  //         "id": 2
  //     },
  //     "nota": "Se atendio con el paciente x",
  //     "estadocita": "pendiente",
  //     "servicio": {
  //         "id": 1
  //     }
  // }

      if(this.citaForm.valid){

          let nuevacita = new Citas();

          let nuevospicologo = new Usuario();
          nuevospicologo.id = this.citaForm.value['idpsicologo'];

          let nuevopaciente = new Paciente();
          nuevopaciente.id = this.pacienteseleccionado

          let nuevoservicio = new Servicio();
          nuevoservicio.id = this.citaForm.value['servicios'];
          

          nuevacita.fechacita = this.fechaseleccionado;
          nuevacita.horacita = this.horaseleccionado;
          nuevacita.modalidad = this.citaForm.value['modalidad'];
          nuevacita.paciente = nuevopaciente;
          nuevacita.psicologo = nuevospicologo;
          nuevacita.nota = "";
          nuevacita.estadocita = "pendiente";
          nuevacita.servicio = nuevoservicio;

        
          console.log(this.citaForm.value);

          this.servicio.guardarCita(nuevacita).subscribe(res => {
            
            if(res != null){
         
              this.dialog.close()
              swall.fire({
                icon: 'success',
                confirmButtonColor:'#0275d8',
                html:  `Se registro correctamente del paciente:  <strong>${this.nombrepaciente}</strong>`,
              })

            }else{
              this.dialog.close()
              swall.fire({
                icon: 'warning',
                confirmButtonColor:'#0275d8',
                html:  `No se  puede registrar la cita del paciente:  <strong>${this.nombrepaciente}</strong> porque solo puede registrarse una cita por paciente al dia`,
              })
            }
          })

          // this.servicio.guardarPacienteServi(this.citaForm.value).subscribe( pac => {
          //       this.dialog.close("guardar")
          //       this.citaForm.reset();
          //       swall.fire({
          //       icon: 'success',
          //       confirmButtonColor:'#0275d8',
          //       html:  `Se registro correctamente al paciente:  <strong>${pac.nombre}</strong>`,
          //       })
          // })
      }

  }


}
