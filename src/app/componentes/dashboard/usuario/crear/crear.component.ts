import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  usuarioForm !: FormGroup

  rolesAsignados: any;

  constructor(private formbuilder: FormBuilder, private servicio: UsuarioService,
             private router : Router, private dialog : MatDialogRef<CrearComponent>) { }

  ngOnInit(): void {
    this.usuarioForm = this.formbuilder.group({
      id:['1'],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['', Validators.required],
      contrasena: ['', Validators.required],
      roles : new FormArray([]),
      correo: ['', Validators.required],
      estado: ['', Validators.required],
      sexo: ['', Validators.required],
    })
  }

  onCheckboxChange(event: any) {
    
    const roles = (this.usuarioForm.controls['roles'] as FormArray);
    if (event.target.checked) {
      roles.push(new FormControl(event.target.value));
    } else {
      const index = roles.controls.findIndex(x => x.value === event.target.value);
      roles.removeAt(index);
    }
  }


  guardarUsuario(){
    
    console.log(this.servicio.getUsuario())

    this.rolesAsignados = this.usuarioForm.value['roles']


    this.servicio.getRoles();
 
    this.servicio.setUsuario(this.usuarioForm.value)
    this.dialog.close();
  }

}
