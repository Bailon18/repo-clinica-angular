import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Roles, Usuario } from './usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlListar: string = 'http://localhost:8080/usuario/listar';
  private urlcrear: string = 'http://localhost:8080/clientes/guardar';
  private urlBuscar: string = 'http://localhost:8080/clientes/buscar';
  private urlActualizar: string = 'http://localhost:8080/clientes/editar';
  private urleliminar: string = 'http://localhost:8080/clientes/eliminar';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});


  // listaRoles: Roles[] = [
  //   {id:1, descripcion:'Admin'},
  //   {id:2, descripcion:'Asistente'},
  //   {id:3, descripcion:'Psicologo'}
  // ]

  // listaUsuarios : Usuario[] = [
  // {id:1, dni:"1111111", nombres:"Bailon", apellidos: "Paucar Montes", correo:"bailon@gmail.com", 
  // contrasena:"admin1", estado:"Activo", sexo:"Femenino", roles:[this.listaRoles[1]]},
  
  // {id:2, dni:"2222222", nombres:"Robert", apellidos: "Palacios", correo:"robert@gmail.com", 
  // contrasena:"admin2", estado:"Activo", sexo:"Masculino", roles:[this.listaRoles[1]]},

  // {id:3, dni:"1111111", nombres:"Bailon", apellidos: "Paucar Montes", correo:"bailon@gmail.com", 
  // contrasena:"admin1", estado:"Inactivo", sexo:"Femenino", roles:[this.listaRoles[3]]},
  
  // {id:4, dni:"2222222", nombres:"kevin", apellidos: "Noriega Montes", correo:"kevin@gmail.com", 
  // contrasena:"psicologo2", estado:"Activo", sexo:"Masculino", roles:[this.listaRoles[3]]},
  // {id:5, dni:"1111111", nombres:"Bailon", apellidos: "Paucar Montes", correo:"bailon@gmail.com", 
  // contrasena:"psicologo1", estado:"Inactivo", sexo:"Femenino", roles:[this.listaRoles[3]]},
  
  // {id:6, dni:"2222222", nombres:"kevin", apellidos: "Noriega Montes", correo:"kevin@gmail.com", 
  // contrasena:"psicologo2", estado:"Activo", sexo:"Masculino", roles:[this.listaRoles[3]]},
  // {id:7, dni:"1111111", nombres:"Bailon", apellidos: "Paucar Montes", correo:"bailon@gmail.com", 
  // contrasena:"psicologo1", estado:"Inactivo", sexo:"Femenino", roles:[this.listaRoles[3]]},
  
  // {id:8, dni:"2222222", nombres:"kevin", apellidos: "Noriega Montes", correo:"kevin@gmail.com", 
  // contrasena:"psicologo2", estado:"Activo", sexo:"Masculino", roles:[this.listaRoles[3]]},
  // {id:9, dni:"1111111", nombres:"Bailon", apellidos: "Paucar Montes", correo:"bailon@gmail.com", 
  // contrasena:"psicologo1", estado:"Activo", sexo:"Femenino", roles:[this.listaRoles[3]]},
  
  // {id:10, dni:"2222222", nombres:"kevin", apellidos: "Noriega Montes", correo:"kevin@gmail.com", 
  // contrasena:"psicologo2", estado:"Activo", sexo:"Masculino", roles:[this.listaRoles[3]]},
  // {id:11, dni:"1111111", nombres:"Bailon", apellidos: "Paucar Montes", correo:"bailon@gmail.com", 
  // contrasena:"psicologo1", estado:"Activo", sexo:"Femenino", roles:[this.listaRoles[3]]},
  
  // {id:12, dni:"2222222", nombres:"kevin", apellidos: "Noriega Montes", correo:"kevin@gmail.com", 
  // contrasena:"psicologo2", estado:"Activo", sexo:"Masculino", roles:[this.listaRoles[3]]},
  // ];

  constructor(private http: HttpClient) { }


  // servicio de listar clientes
  getUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.urlListar);
  }



  getUsuario(){
    //return this.listaUsuarios.reverse();
  }

  setUsuario(usuario: Usuario){
    //this.listaUsuarios.push(usuario)
  }

  getRoles(){
    //return this.listaRoles;
  }

  updateUsuario(dato: any, id: number){
    //this.listaUsuarios = this.listaUsuarios.filter((fila) => fila.id !== id);
    //this.listaUsuarios.push(dato);
  }
}
