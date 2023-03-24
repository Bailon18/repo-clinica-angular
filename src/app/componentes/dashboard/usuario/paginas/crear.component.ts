import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Roles, Usuario } from '../model/usuario';
import swall from 'sweetalert2';


@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  usuarioForm !: FormGroup
  rolesServicios: any;
  rolesDevista!: Roles[];
  titulo: string = "Nuevo Usuario";
  tituloBoton:string ="Guardar"
 

  listaRoles! : Roles[];

  constructor(private formbuilder: FormBuilder, 
            private servicio: UsuarioService,
            @Inject(MAT_DIALOG_DATA) public datoedit : any,
            private dialog : MatDialogRef<CrearComponent>,
            private _snackBar: MatSnackBar)
          {}

  ngOnInit(): void {

    this.listaRoles = this.servicio.getRoles();
    
    this.usuarioForm = this.formbuilder.group({
      id:[''],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['',[Validators.required,Validators.min(10000000),Validators.max(99999999)]],
      contrasena: ['',[Validators.required, Validators.minLength(5)]],
      correo: ['', [Validators.required, Validators.email]],
      estado: ['', Validators.required],
      sexo: ['', Validators.required],
    })


    if(this.datoedit){

      this.listaRoles.forEach((item) => {
        item.seleccion = false;})

      this.servicio.buscarUsuario(this.datoedit.id).subscribe(u => 
        {

          this.usuarioForm.controls['id'].setValue(u.id)
          this.usuarioForm.controls['nombres'].setValue(u.nombres);
          this.usuarioForm.controls['apellidos'].setValue(u.apellidos);
          this.usuarioForm.controls['dni'].setValue(u.dni);
          this.usuarioForm.controls['contrasena'].setValue(u.contrasena);
          this.usuarioForm.controls['correo'].setValue(u.correo);
          this.usuarioForm.controls['estado'].setValue(u.estado);
          this.usuarioForm.controls['sexo'].setValue(u.sexo);


          for(const r of u.roles){
            for(const rn of this.listaRoles){
              if(r.id === rn.id){
                rn.seleccion = true;
              }
            }
          }
        })

      this.titulo = "Editar Usuario";
      this.tituloBoton = "Actualizar";

    }
  }


  onchange(event: any) {
    this.rolesDevista = this.listaRoles.slice()
  }


  guardarUsuario(){

    if(!this.datoedit){
    
        if(this.usuarioForm.valid){
    
          let copiaRoles = this.rolesDevista.slice()
    
          let resultado = copiaRoles.filter(x => x.seleccion==true).map(({seleccion, ...rest}) => {
            return rest;
          });

          this.usuarioForm.value['roles']= resultado

          //console.log("US ", this.usuarioForm.value);
          
          this.servicio.guardarUsuarioServi(this.usuarioForm.value).subscribe( usu => {

              
              this.listaRoles.forEach((item) => {
              item.seleccion = false;})
            
              this.dialog.close("guardar")
              swall.fire({
                icon: 'success',
                confirmButtonColor:'#0275d8',
                html:  `Se registro correctamente al usuario:  <strong>${this.usuarioForm.value['nombres']}</strong>`,
              })
          
            }
          )
        }
    }else{
      this.actualizarUsuario()
    }

  }

  actualizarUsuario(){
    
    this.onchange(Event)

    let copiaRoles = this.rolesDevista.slice()
    
    let resultado = copiaRoles.filter(x => x.seleccion==true).map(({seleccion, ...rest}) => {
      return rest;
    });

    this.usuarioForm.value['roles']= resultado
    
    this.servicio.actualizarUsuarioServi(this.usuarioForm.value).subscribe(usuario => {

      this.listaRoles.forEach((item) => {
      item.seleccion = false;})

      this.dialog.close("actualizar");
      swall.fire({
        icon: 'success',
        confirmButtonColor:'#0275d8',
        html:  `Se actualizo correctamente al usuario:  <strong>${this.usuarioForm.value['nombres']}</strong>`,
      })

    })

  }


  validardni(event:any){

    const dni = (event.target as HTMLInputElement).value;
    
    if(dni.length == 8){

      this.servicio.validardni(dni).subscribe(res => {
        if(res != null ){
          this.usuarioForm.controls['dni'].setErrors({ invalid: 'Dni ya esta registrado' });
        }else{
          this.usuarioForm.controls['dni'].setErrors(null);
        }
      })
    }
  }


  validarcorreo(event:any){

    if (this.usuarioForm.controls['correo'].valid){
      const correo = (event.target as HTMLInputElement).value;

      this.servicio.validarcorreo(correo).subscribe(res => {
        if(res != null ){
          this.usuarioForm.controls['correo'].setErrors({ invalid: 'Correo ya esta registrado' });
        }else{
          this.usuarioForm.controls['correo'].setErrors(null);
        }
      })

    }
  }
}
