import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Usuario } from '../dashboard/usuario/model/usuario';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlValidar: string = "http://localhost:8090/login/validar"

 //usu: Usuario = new Usuario();

  sesionUsuario: string;

  usuarios: Usuario;

  val:Usuario;

  @Output()
  usuarioEmitter = new EventEmitter<Usuario>();

  @Output()
  rolSesionEmitter = new EventEmitter<String>();

  constructor(private http: HttpClient) { }


  getValidacion(correo:string, password:string):Observable<Usuario>{
    this.http.get<Usuario>(`${this.urlValidar}/${correo}/${password}`).subscribe( res => {
        this.usuarios = res;
      }
    );
    this.getObtenerUsuario()
    return this.http.get<Usuario>(`${this.urlValidar}/${correo}/${password}`);
  }

  getObtenerUsuario():Observable<Usuario>{
    this.usuarioEmitter.emit(this.usuarios)
    return of(this.usuarios);
  }

  // aqui setea desde el componente login -> el rol seleccionado
  setRolSesion(rolInicio:string):Observable<string>{
    this.sesionUsuario = rolInicio;
    this.getObtenerRolSesion()
    return of(this.sesionUsuario); // retorna un observable
  }


  // aqui se emite el rol seleccionado para ser utilizado en cualquier componente
  getObtenerRolSesion(): Observable<string>{
    this.rolSesionEmitter.emit(this.sesionUsuario);
    return of(this.sesionUsuario);
  }

}
