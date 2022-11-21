import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  usuarioForm !: FormGroup
  rolesServicios: any;
  rolesDevista: any;
  titulo: string = "Nuevo Usuario";
  tituloBoton:string ="Guardar"

  constructor(private formbuilder: FormBuilder, 
            private servicio: UsuarioService,
            @Inject(MAT_DIALOG_DATA) public datoedit : any,
            private dialog : MatDialogRef<CrearComponent>,
            private _snackBar: MatSnackBar)
          {}

  ngOnInit(): void {

    this.usuarioForm = this.formbuilder.group({
      id:['1'],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['',[Validators.required,Validators.min(10000000),Validators.max(99999999)]],
      contrasena: ['',[Validators.required, Validators.minLength(5)]],
      roles : new FormArray([]),
      correo: ['', [Validators.required, Validators.email]],
      estado: ['', Validators.required],
      sexo: ['', Validators.required],
    })

    if(this.datoedit){

      this.usuarioForm.controls['nombres'].setValue(this.datoedit.nombres);
      this.usuarioForm.controls['apellidos'].setValue(this.datoedit.apellidos);
      this.usuarioForm.controls['dni'].setValue(this.datoedit.dni);
      this.usuarioForm.controls['contrasena'].setValue(this.datoedit.contrasena);
      this.usuarioForm.controls['correo'].setValue(this.datoedit.correo);
      this.usuarioForm.controls['estado'].setValue(this.datoedit.estado);
      this.usuarioForm.controls['sexo'].setValue(this.datoedit.sexo);

      this.titulo = "Editar Usuario";
      this.tituloBoton = "Actualizar";

    }

    console.log(this.datoedit)
  }

  onCheckboxChange(event: any) {

    const roles = (this.usuarioForm.controls['roles'] as FormArray);
    if (event.target.checked) {
      roles.push(new FormControl( parseInt(event.target.value)));
    } else {
      const index = roles.controls.findIndex(x => x.value === parseInt(event.target.value));
      roles.removeAt(index);
    }
  }


  guardarUsuario(){

    if(!this.datoedit){
    
        if(this.usuarioForm.valid){
    
          this.rolesDevista = this.usuarioForm.value['roles']
          this.rolesServicios = this.servicio.getRoles();
      
          const rolesSeleccionados = [];
      
          for (const i of this.rolesDevista) {
            for (const j of this.rolesServicios) {
                if(i == j.id){
                  rolesSeleccionados.push(j)
                }
            }
          }
      
          this.usuarioForm.value['roles']= rolesSeleccionados
          this.servicio.setUsuario(this.usuarioForm.value)
          this.dialog.close("guardar");
          this.mensaje("Se registro usuario correctamente ", "Valido")
        }
    }else{
      this.actualizarUsuario()
    }

  }

  actualizarUsuario(){
    this.servicio.updateUsuario(this.usuarioForm.value, this.datoedit.id);
    this.dialog.close("actualizar");
    this.mensaje("Se actualizo usuario correctamente ", "Valido");
  }


  mensaje(mensaje:string, tipo:string) {
      this._snackBar.open(mensaje, tipo, {
        duration:3000,
        horizontalPosition:'center',
        verticalPosition:'bottom'
      });
  }
  

}
