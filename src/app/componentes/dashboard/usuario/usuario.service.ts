import { Injectable } from '@angular/core';
import { Roles, Usuario } from './usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  admin: Roles= {id:1, descripcion:'Admin'}
  asistente: Roles= {id:1, descripcion:'Asistente'}
  psicologo: Roles= {id:1, descripcion:'Psicologo'}

  listaUsuarios: Usuario[] = [
  {id:1, dni:"1111111", nombres:"Bailon", apellidos: "Paucar Montes", correo:"bailon@gmail.com", 
  contrasena:"admin1", estado:1, sexo:"F", idRol:this.admin},
  
  {id:2, dni:"2222222", nombres:"kevin", apellidos: "Noriega Montes", correo:"kevin@gmail.com", 
  contrasena:"admin2", estado:0, sexo:"M", idRol:this.psicologo},
  {id:1, dni:"1111111", nombres:"Bailon", apellidos: "Paucar Montes", correo:"bailon@gmail.com", 
  contrasena:"admin1", estado:1, sexo:"F", idRol:this.admin},
  
  {id:2, dni:"2222222", nombres:"kevin", apellidos: "Noriega Montes", correo:"kevin@gmail.com", 
  contrasena:"admin2", estado:0, sexo:"M", idRol:this.psicologo},
  {id:1, dni:"1111111", nombres:"Bailon", apellidos: "Paucar Montes", correo:"bailon@gmail.com", 
  contrasena:"admin1", estado:1, sexo:"F", idRol:this.admin},
  
  {id:2, dni:"2222222", nombres:"kevin", apellidos: "Noriega Montes", correo:"kevin@gmail.com", 
  contrasena:"admin2", estado:0, sexo:"M", idRol:this.psicologo},
  {id:1, dni:"1111111", nombres:"Bailon", apellidos: "Paucar Montes", correo:"bailon@gmail.com", 
  contrasena:"admin1", estado:1, sexo:"F", idRol:this.admin},
  
  {id:2, dni:"2222222", nombres:"kevin", apellidos: "Noriega Montes", correo:"kevin@gmail.com", 
  contrasena:"admin2", estado:0, sexo:"M", idRol:this.psicologo},
  {id:1, dni:"1111111", nombres:"Bailon", apellidos: "Paucar Montes", correo:"bailon@gmail.com", 
  contrasena:"admin1", estado:1, sexo:"F", idRol:this.admin},
  
  {id:2, dni:"2222222", nombres:"kevin", apellidos: "Noriega Montes", correo:"kevin@gmail.com", 
  contrasena:"admin2", estado:0, sexo:"M", idRol:this.psicologo},
  {id:1, dni:"1111111", nombres:"Bailon", apellidos: "Paucar Montes", correo:"bailon@gmail.com", 
  contrasena:"admin1", estado:1, sexo:"F", idRol:this.admin},
  
  {id:2, dni:"2222222", nombres:"kevin", apellidos: "Noriega Montes", correo:"kevin@gmail.com", 
  contrasena:"admin2", estado:0, sexo:"M", idRol:this.psicologo},
  ];

  constructor() { }

  getUsuario(){
    return this.listaUsuarios;
  }
}
