import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Roles, Usuario } from '../model/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlListar: string = 'https://repo-clinicaa-spring-production.up.railway.app/usuario/listar';
  private urlcrear: string = 'https://repo-clinicaa-spring-production.up.railway.app/usuario/guardar';
  private urlBuscar: string = 'https://repo-clinicaa-spring-production.up.railway.app/usuario/buscar';
  private urlActualizar: string = 'https://repo-clinicaa-spring-production.up.railway.app/usuario/actualizar';
  private urlBloquear: string = 'https://repo-clinicaa-spring-production.up.railway.app/usuario/bloquearUsuario';
  private urlvalidarcorreo: string = 'https://repo-clinicaa-spring-production.up.railway.app/usuario/validarcorreo';
  private urlvalidardni: string = 'https://repo-clinicaa-spring-production.up.railway.app/usuario/validardni';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});


  listaRoles: Roles[] = [
    {id:1, descripcion:'Administrador', seleccion:false},
    {id:2, descripcion:'Asistente', seleccion:false},
    {id:3, descripcion:'Psicologo', seleccion:false}
  ]

  constructor(private http: HttpClient) { }


  // servicio de listar clientes
  getUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.urlListar);
  }

  // servicio de buscar un  cliente
  buscarUsuario(id:number): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.urlBuscar}/${id}`);
  }
  guardarUsuarioServi(usuario: Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(this.urlcrear, usuario, {headers: this.httpHeaders});
  }

  actualizarUsuarioServi(usuario: Usuario):Observable<Usuario>{
    return this.http.put<Usuario>(this.urlActualizar, usuario,{headers: this.httpHeaders})
  }

  bloquearUsuarioServi(usuario: Usuario): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.urlBloquear}/${usuario.id}`)
  }

  validarcorreo(correo: string): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.urlvalidarcorreo}/${correo}`)
  }

  validardni(dni: string): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.urlvalidardni}/${dni}`)
  }

  getRoles(){
    return this.listaRoles;
  }

}
