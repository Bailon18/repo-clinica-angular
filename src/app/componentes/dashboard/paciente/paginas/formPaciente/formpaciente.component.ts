
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import swall from 'sweetalert2';
import { PacienteService } from '../../services/paciente.service';
import { EstadoCivil } from '../../models/estadoCivil';
import { Ocupacion } from '../../models/ocupacion';


import { DateAdapter } from '@angular/material/core';



@Component({
  selector: 'app-formpaciente',
  templateUrl: './formpaciente.component.html',
  styleUrls: ['./formpaciente.component.css'],
})
export class FormpacienteComponent implements OnInit {

  pacienteForm !: FormGroup
  titulo: string = "Nuevo Paciente";
  tituloBoton:string ="Guardar"

  ocupaciones: Ocupacion[];
  estadocivil: EstadoCivil[];

  constructor(private formbuilder: FormBuilder, 
    private servicio: PacienteService,
    @Inject(MAT_DIALOG_DATA) public datoedit : any,
    private dialog : MatDialogRef<FormpacienteComponent>)
  {
  }



  ngOnInit(): void {

      this.ocupaciones = JSON.parse(localStorage.getItem('ocupaciones')!) || [];
      this.estadocivil = JSON.parse(localStorage.getItem('estadocivil')!) || [];

      
      this.pacienteForm = this.formbuilder.group({
        id:[''],
        nombre: ['Anonimo', Validators.required],
        apellidos: ['Anonimo Montes', Validators.required],
        telefono: ['987654321',[Validators.required,Validators.min(100000000),Validators.max(999999999)]], //
        correo: ['admin@gmail.com', [Validators.required, Validators.email]],
        sexo: ['', Validators.required], //
        fechanacimiento: ['', Validators.required],
        ocupacion: ['', Validators.required],
        estadocivil: ['', Validators.required],
        documento: ['98765432',[Validators.required,Validators.min(10000000),Validators.max(99999999)]],
        direccion: ['av peru', Validators.required],//
        distrito: ['Villa el salvaje', Validators.required],//
      })

      if(this.datoedit){

        

        this.servicio.buscarPaciente(this.datoedit.id).subscribe(u => {

        
          this.pacienteForm.controls['id'].setValue(u.id);
          this.pacienteForm.controls['nombre'].setValue(u.nombre);
          this.pacienteForm.controls['apellidos'].setValue(u.apellidos);
          this.pacienteForm.controls['telefono'].setValue(u.telefono);
          this.pacienteForm.controls['correo'].setValue(u.correo);
          this.pacienteForm.controls['sexo'].setValue(u.sexo);
          this.pacienteForm.controls['fechanacimiento'].setValue(u.fechanacimiento); //
          this.pacienteForm.controls['ocupacion'].setValue(u.ocupacion.id);
          this.pacienteForm.controls['estadocivil'].setValue(u.estadocivil.id);
          this.pacienteForm.controls['documento'].setValue(u.documento);
          this.pacienteForm.controls['direccion'].setValue(u.direccion);
          this.pacienteForm.controls['distrito'].setValue(u.distrito);

        })

        this.titulo = "Editar Paciente";
        this.tituloBoton = "Actualizar";
      }

    }


  guardarPaciente():void{

    if(!this.datoedit){
        if(this.pacienteForm.valid){

            this.pacienteForm.value['ocupacion']= new Ocupacion(this.pacienteForm.value['ocupacion']); ;
            this.pacienteForm.value['estadocivil']= new EstadoCivil(this.pacienteForm.value['estadocivil'])
      
            this.servicio.guardarPacienteServi(this.pacienteForm.value).subscribe( pac => {
                  this.dialog.close("guardar")
                  this.pacienteForm.reset();
                  swall.fire({
                  icon: 'success',
                  confirmButtonColor:'#0275d8',
                  html:  `Se registro correctamente al paciente:  <strong>${pac.nombre}</strong>`,
                  })
            })
        }
    }else{
        this.actualizarPaciente();
    }
  }

  actualizarPaciente(){

    if(this.datoedit){

        if(this.pacienteForm.valid){

            this.pacienteForm.value['ocupacion']= this.ocupaciones.filter(ocu => ocu.id == this.pacienteForm.value['ocupacion'])[0];
            this.pacienteForm.value['estadocivil']= this.estadocivil.filter(esta => esta.id == this.pacienteForm.value['estadocivil'])[0];

            this.servicio.actualizarPacienteServi(this.pacienteForm.value).subscribe(pac => {

                this.dialog.close("actualizar");
                swall.fire({
                    icon: 'success',
                    confirmButtonColor:'#0275d8',
                    html:  `Se actualizo correctamente al Paciente:  <strong>${pac.nombre}</strong>`,
                })

            })

        }

    }

  }

  validardni(event:any){

    const dni = (event.target as HTMLInputElement).value;
    
    if(dni.length == 8){

      this.servicio.validardni(dni).subscribe(res => {
        if(res != null ){
          this.pacienteForm.controls['documento'].setErrors({ invalid: 'Dni ya esta registrado' });
        }else{
          this.pacienteForm.controls['documento'].setErrors(null);
        }
      })
    }
  }


  validarcorreo(event:any){

    if (this.pacienteForm.controls['correo'].valid){
      const correo = (event.target as HTMLInputElement).value;

      this.servicio.validarcorreo(correo).subscribe(res => {
        if(res != null ){
          this.pacienteForm.controls['correo'].setErrors({ invalid: 'Correo ya esta registrado' });
        }else{
          this.pacienteForm.controls['correo'].setErrors(null);
        }
      })

    }
  }


  obtenerfecha(event:any){

    if(event != null){
      
      let fechatext = (event.value.toLocaleDateString('es-PE', { weekday:"long", year:"numeric", month:"short", day:"numeric"})).split(" ", 6)[5];
     
      let ahoactuali = new Date().getFullYear();

      if(parseInt(fechatext) < ahoactuali - 2){
        this.pacienteForm.controls['fechanacimiento'].setErrors(null);
      }else{
        this.pacienteForm.controls['fechanacimiento'].setErrors({ invalid: 'Solo se puede registrar paciente mayor de 2 años' });
      }

    }

  }
}
