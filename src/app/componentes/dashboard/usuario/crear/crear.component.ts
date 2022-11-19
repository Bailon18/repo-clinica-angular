import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  usuarioForm !: FormGroup

  constructor(private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.usuarioForm = this.formbuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['', Validators.required],
      contrasena: ['', Validators.required],
      correo: ['', Validators.required],
      roles: ['', Validators.required],
      estado: ['', Validators.required],
      sexo: ['', Validators.required],
    })
  }

}
