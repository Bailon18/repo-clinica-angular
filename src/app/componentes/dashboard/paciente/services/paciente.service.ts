import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ocupacion } from '../models/ocupacion';
import { EstadoCivil } from '../models/estadoCivil';
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private urlocupacion: string = 'http://localhost:8090/paciente/listarOcupaciones';
  private urloetapav: string = 'http://localhost:8090/paciente/listarEstadoCi';
  private urlPaciente: string = 'http://localhost:8090/paciente/listarPacientes'
  private urlBuscar: string = 'http://localhost:8090/paciente/buscarPaciente';
  private urlcrear: string = 'http://localhost:8090/paciente/guardarPaciente';
  private urlActualizar: string = 'http://localhost:8090/paciente/actualizarPaciente';
  private urlvalidarcorreo: string = 'http://localhost:8090/paciente/validarcorreo';
  private urlvalidardni: string = 'http://localhost:8090/paciente/validardni';
  

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});


  constructor(private http: HttpClient) { }


  getPacientes():Observable<Paciente[]>{
    return this.http.get<Paciente[]>(this.urlPaciente);
  }

  getOcupaciones():Observable<Ocupacion[]>{
    return this.http.get<Ocupacion[]>(this.urlocupacion);
  }

  getEstadoCivil():Observable<EstadoCivil[]>{
    return this.http.get<EstadoCivil[]>(this.urloetapav);
  }

  buscarPaciente(id:number): Observable<Paciente>{
    return this.http.get<Paciente>(`${this.urlBuscar}/${id}`);
  }

  guardarPacienteServi(paciente: Paciente):Observable<Paciente>{
    return this.http.post<Paciente>(this.urlcrear, paciente, {headers: this.httpHeaders});
  }

  actualizarPacienteServi(paciente: Paciente):Observable<Paciente>{
    return this.http.put<Paciente>(this.urlActualizar, paciente,{headers: this.httpHeaders})
  }


  validarcorreo(correo: string): Observable<Paciente>{
    return this.http.get<Paciente>(`${this.urlvalidarcorreo}/${correo}`)
  }

  validardni(dni: string): Observable<Paciente>{
    return this.http.get<Paciente>(`${this.urlvalidardni}/${dni}`)
  }


}
