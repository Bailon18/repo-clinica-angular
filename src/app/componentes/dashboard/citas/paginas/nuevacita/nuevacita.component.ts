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


  /**
   * Metodo donde todo se inicializa
   * - Datos a setear(localstorage) al modal(fecha , hora , psicologo)
   */
  ngOnInit(): void {

      this.datosetear  = JSON.parse(localStorage.getItem('datoscita')!) || [];


      this.fechaseleccionado = this.datosetear[2];
      this.horaseleccionado =  Number.parseInt(this.datosetear[3].slice(0,2));
      let fecha = new Date(this.fechaseleccionado).toLocaleDateString('en-CA')

      this.citaForm = this.formbuilder.group({
        
        idpsicologo:[this.datosetear[0]],
        idpaciente : [''],
        fechacita: [{value: fecha, disabled: true},], //text -> fecha automatico
        hora:[{value: this.datosetear[3], disabled: true},], // text -> hora automatico
        modalidad: [''], // combobox - manual -> Virtual Presencial
        psicologo:[{value: this.datosetear[1], disabled: true} ,Validators.required], // text -> paciente automatico
        paciente:['',Validators.required], //
        nota:[''],
        estadocita:['Pendiente', Validators.required],
        servicios:['', Validators.required],
        
      }
      )
    }

  /**
   * Metodo que tiene por funcionalidad buscar un usuario atraves del dni
   * ENCUENTRA -> mostrar el nombre de usuario cuando lo encuentra 
   * NO ENCUENTRA -> de lo contrario sigue mostrando "PACIENTE NO SELECCIONADO"
   * 
   */
  buscarusuario(event: any){

    this.nombrepaciente = 'Paciente no seleccionado';

    const dni = (event.target as HTMLInputElement).value;

    if(dni.length == 8){

      this.servicio.buscarpacientedni(dni).subscribe(pac => {
        
        if(pac != null ){
          this.nombrepaciente =  pac.nombre + " " +pac.apellidos;
          this.pacienteseleccionado= pac.id;
        }
        
      })
    }
  }

  /*
   * Metodo que tiene por funcionalidad guardar una nueva cita
  */
  guardarCita():void{


      if(this.citaForm.valid){

          let nuevacita = new Citas();

          let nuevospicologo = new Usuario();
          nuevospicologo.id = this.citaForm.value['idpsicologo'];
          
          let nuevopaciente = new Paciente(this.pacienteseleccionado);
          let nuevoservicio = new Servicio(this.citaForm.value['servicios']);
          
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
                html:  `Se registro correctamente cita del paciente:  <strong>${this.nombrepaciente}</strong>`,
              })

            }else{
              this.dialog.close()
              swall.fire({
                icon: 'warning',
                confirmButtonColor:'#0275d8',
                html:  `No se  puede registrar la cita del paciente:  <strong>${this.nombrepaciente}</strong> 
                porque solo puede registrarse una cita por paciente al dia`,
              })
            }
          })

      }

  }


}
