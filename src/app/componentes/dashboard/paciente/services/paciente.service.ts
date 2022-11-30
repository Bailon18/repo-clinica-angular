import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ocupacion } from '../models/ocupacion';
import { EstadoCivil } from '../models/estadoCivil';
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private urlocupacion: string = 'http://localhost:8080/paciente/listarOcupaciones';
  private urloetapav: string = 'http://localhost:8080/paciente/listarEstadoCi';
  private urlPaciente: string = 'http://localhost:8080/paciente/listarPacientes'


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

}
