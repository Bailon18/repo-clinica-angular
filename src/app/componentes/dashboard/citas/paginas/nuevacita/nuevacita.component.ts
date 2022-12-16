import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import swall from 'sweetalert2';
import { CitasService } from '../../services/citas.service';
import { Paciente } from '../../../paciente/models/paciente';


@Component({
  selector: 'app-nuevacita',
  templateUrl: './nuevacita.component.html',
  styleUrls: ['./nuevacita.component.css']
})
export class NuevacitaComponent implements OnInit {

  citaForm !: FormGroup
 
  constructor(private formbuilder: FormBuilder, 
    private servicio: CitasService, private dialog : MatDialogRef<NuevacitaComponent>)
  {
  }


  ngOnInit(): void {

      //this.ocupaciones = JSON.parse(localStorage.getItem('ocupaciones')!) || [];

      this.citaForm = this.formbuilder.group({
        id:[''],
        fechacita: ['2020-12-22'], //text -> fecha automatico
        hora:['9am', Validators.required], // text -> hora automatico
        modalidad: ['', Validators.required], // combobox - manual -> Virtual Presencial
        psicologo:['Herlly',Validators.required], // text -> paciente automatico
        paciente:['Lucas',Validators.required], //
        nota:[''],
        estadocita:['Pendiente', Validators.required],
        servicios:['', Validators.required]
      })

    }


  guardarPaciente():void{
      if(this.citaForm.valid){

  
          console.log(this.citaForm.value);

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
