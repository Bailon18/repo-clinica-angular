
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import swall from 'sweetalert2';
import { PacienteService } from '../../services/paciente.service';
import { EstadoCivil } from '../../models/estadoCivil';
import { Ocupacion } from '../../models/ocupacion';



@Component({
  selector: 'app-formpaciente',
  templateUrl: './formpaciente.component.html',
  styleUrls: ['./formpaciente.component.css']
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
  {}


  ngOnInit(): void {
    // traemoslas lista de ocupaciones y estadocivil para setearlos a los combobox
    this.servicio.getOcupaciones().subscribe({
      next:(res) =>{
        this.ocupaciones = res;
      }
    })

    this.servicio.getEstadoCivil().subscribe({
      next:(res) =>{
        this.estadocivil = res;
      }
    })

    this.pacienteForm = this.formbuilder.group({
      id:[''],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', Validators.required],
      sexo: ['', Validators.required],
      fechanacimiento: ['', Validators.required],
      ocupacion: ['', Validators.required],
      estadocivil: ['', Validators.required],
      documento: ['',[Validators.required,Validators.min(10000000),Validators.max(99999999)]],
      direccion: ['', [Validators.required, Validators.email]],
      distrito: ['', Validators.required],
    })
  }


  onchange(event: any) {
    // this.rolesDevista = this.listaRoles.slice()
  }


  guardarPaciente(){

    // if(!this.datoedit){
    
    //     if(this.pacienteForm.valid){
    
    //       let copiaRoles = this.rolesDevista.slice()
    
    //       let resultado = copiaRoles.filter(x => x.seleccion==true).map(({seleccion, ...rest}) => {
    //         return rest;
    //       });

    //       this.pacienteForm.value['roles']= resultado
          
    //       this.servicio.guardarUsuarioServi(this.pacienteForm.value).subscribe( usu => {

              
    //           this.listaRoles.forEach((item) => {
    //           item.seleccion = false;})
            
    //           this.dialog.close("guardar")
    //           swall.fire({
    //             icon: 'success',
    //             confirmButtonColor:'#0275d8',
    //             html:  `Se registro correctamente al usuario:  <strong>${this.pacienteForm.value['nombres']}</strong>`,
    //           })
          
    //         }
    //       )
    //     }
    // }else{
    //   this.actualizarUsuario()
    // }

  }

  actualizarPaciente(){
    
    // this.onchange(Event)

    // let copiaRoles = this.rolesDevista.slice()
    
    // let resultado = copiaRoles.filter(x => x.seleccion==true).map(({seleccion, ...rest}) => {
    //   return rest;
    // });

    // this.pacienteForm.value['roles']= resultado
    
    // this.servicio.actualizarUsuarioServi(this.pacienteForm.value).subscribe(usuario => {

    //   this.listaRoles.forEach((item) => {
    //   item.seleccion = false;})

    //   this.dialog.close("actualizar");
    //   swall.fire({
    //     icon: 'success',
    //     confirmButtonColor:'#0275d8',
    //     html:  `Se actualizo correctamente al usuario:  <strong>${this.pacienteForm.value['nombres']}</strong>`,
    //   })

    // })

  }
}
