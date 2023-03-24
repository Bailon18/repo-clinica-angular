import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';
import { UsuarioComponent } from './dashboard/usuario/usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
  ],
  exports:[
    LoginComponent,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
  ,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    
  ]
})
export class ComponentesModule { }
