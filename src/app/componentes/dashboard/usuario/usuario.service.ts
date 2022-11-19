import { Injectable } from '@angular/core';
import { Roles, Usuario } from './usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

 
  listaRoles: Roles[] = [
    {id:1, descripcion:'Admin'},
    {id:2, descripcion:'listaRoles[1'},
    {id:3, descripcion:'Psicologo'}
  ]

  listaUsuarios : Usuario[] = [
  {id:1, dni:"1111111", nombres:"Bailon", apellidos: "Paucar Montes", correo:"bailon@gmail.com", 
  contrasena:"admin1", estado:1, sexo:"F", roles:[this.listaRoles[1]]},
  
  {id:2, dni:"2222222", nombres:"kevin", apellidos: "Noriega Montes", correo:"kevin@gmail.com", 
  contrasena:"admin2", estado:0, sexo:"M", roles:[this.listaRoles[1]]},
  {id:2, dni:"1111111", nombres:"Bailon", apellidos: "Paucar Montes", correo:"bailon@gmail.com", 
  contrasena:"admin1", estado:1, sexo:"F", roles:[this.listaRoles[3]]},
  
  {id:4, dni:"2222222", nombres:"kevin", apellidos: "Noriega Montes", correo:"kevin@gmail.com", 
  contrasena:"psicologo2", estado:0, sexo:"M", roles:[this.listaRoles[3]]},
  {id:5, dni:"1111111", nombres:"Bailon", apellidos: "Paucar Montes", correo:"bailon@gmail.com", 
  contrasena:"psicologo1", estado:1, sexo:"F", roles:[this.listaRoles[3]]},
  
  {id:6, dni:"2222222", nombres:"kevin", apellidos: "Noriega Montes", correo:"kevin@gmail.com", 
  contrasena:"psicologo2", estado:0, sexo:"M", roles:[this.listaRoles[3]]},
  {id:7, dni:"1111111", nombres:"Bailon", apellidos: "Paucar Montes", correo:"bailon@gmail.com", 
  contrasena:"psicologo1", estado:1, sexo:"F", roles:[this.listaRoles[3]]},
  
  {id:8, dni:"2222222", nombres:"kevin", apellidos: "Noriega Montes", correo:"kevin@gmail.com", 
  contrasena:"psicologo2", estado:0, sexo:"M", roles:[this.listaRoles[3]]},
  {id:9, dni:"1111111", nombres:"Bailon", apellidos: "Paucar Montes", correo:"bailon@gmail.com", 
  contrasena:"psicologo1", estado:1, sexo:"F", roles:[this.listaRoles[3]]},
  
  {id:10, dni:"2222222", nombres:"kevin", apellidos: "Noriega Montes", correo:"kevin@gmail.com", 
  contrasena:"psicologo2", estado:0, sexo:"M", roles:[this.listaRoles[3]]},
  {id:11, dni:"1111111", nombres:"Bailon", apellidos: "Paucar Montes", correo:"bailon@gmail.com", 
  contrasena:"psicologo1", estado:1, sexo:"F", roles:[this.listaRoles[3]]},
  
  {id:12, dni:"2222222", nombres:"kevin", apellidos: "Noriega Montes", correo:"kevin@gmail.com", 
  contrasena:"psicologo2", estado:0, sexo:"M", roles:[this.listaRoles[3]]},
  ];

  constructor() { }

  getUsuario(){
    return this.listaUsuarios;
  }

  setUsuario(usuario: Usuario){
    this.listaUsuarios.push(usuario)
  }


  getRoles(){
    return this.listaRoles;
  }
}
