import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../usuario/model/usuario';
import { PacienteDTO } from '../model/pacientedto';
import { Citas } from '../model/citas';
import { CitasDTO } from '../model/citasdto';
import { Afiliacion } from '../model/afiliacion';
import { Paciente } from '../../paciente/models/paciente';
import { ListaCitaxPsicologaDTO } from '../model/listacitasxpsicologadto';


@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private urlbuscarcitas: string = 'http://localhost:8090/citas/buscarcitas';
  private urlbuscarcitasID: string = 'http://localhost:8090/citas/buscarcitasid';
  private urlListar: string = 'http://localhost:8090/usuario/listar';
  private urldias : string ='http://localhost:8090/citas/listardias';
  private urlpacientecita : string ='http://localhost:8090/paciente/pagendar';
  private urlcrear : string ='http://localhost:8090/citas/guardarcita';
  private urlactualizarcita : string ='http://localhost:8090/citas/actualizarcita';
  private urlbuscarpacienteagen : string = 'http://localhost:8090/paciente/buscarpaciente'
  private urlcrearafi : string ='http://localhost:8090/afiliacion/guardarafiliacion';
  private urlvalidarafi : string ='http://localhost:8090/afiliacion/validarafiliacion';
  private urleliminarcita : string = 'http://localhost:8090/citas/eliminarcita';
  private urllistacitaxpsicologa : string = 'http://localhost:8090/citas/listarcitasxpiscologa';
  private urlbuscarcitasporfechas : string = 'http://localhost:8090/citas/buscarcitasporfechas';


  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient) { }

  buscarCitas(id:number, fecha:Date): Observable<Citas[]>{
    return this.http.get<Citas[]>(`${this.urlbuscarcitas}/${id}/${fecha}`);
  }

  buscarpacientecitas(id:number, fecha:Date): Observable<Citas[]>{
    return this.http.get<Citas[]>(`${this.urlbuscarcitas}/${id}/${fecha}`);
  }

  buscarpacientedni(dni:string): Observable<PacienteDTO>{
    return this.http.get<PacienteDTO>(`${this.urlpacientecita}/${dni}`);
  }

  listarPsicologas(): Observable<Usuario[]>{
      return this.http.get<Usuario[]>(this.urlListar);
  }

  listardias(mes: number): Observable<number[]>{
    return this.http.get<number[]>(`${this.urldias}/${mes}`);
  }

  guardarCita(cita: Citas):Observable<Citas>{
    return this.http.post<Citas>(this.urlcrear, cita, {headers: this.httpHeaders});
  }

  actualizarCita(cita: Citas):Observable<Citas>{
    return this.http.put<Citas>(this.urlactualizarcita, cita, {headers: this.httpHeaders});
  }

  buscarcitaid(id:number):Observable<CitasDTO>{
    return this.http.get<CitasDTO>(`${this.urlbuscarcitasID}/${id}`);
  }

  guardarafiliacion(afiliacion: Afiliacion):Observable<Afiliacion>{
    return this.http.post<Afiliacion>(this.urlcrearafi, afiliacion, {headers: this.httpHeaders});
  }

  validarafi(id: number): Observable<Afiliacion>{
    return this.http.get<Afiliacion>(`${this.urlvalidarafi}/${id}`);
  }

  busquedapacienteagendar(idpsico: number, idpaci: number  ): Observable<any>{
    return this.http.get<any>(`${this.urlbuscarpacienteagen}/${idpsico}/${idpaci}`);
  }

  buscarcitasporfechas(fechainicio: Date, fechafinal: Date  , psicologa: number): Observable<Citas[]>{
    return this.http.get<Citas[]>(`${this.urlbuscarcitasporfechas}/${fechainicio}/${fechafinal}/${psicologa}`);
  }

  eliminarcita(idcita:number): Observable<any>{
    return this.http.get<any>(`${this.urleliminarcita}/${idcita}`);
  }

  listarcitasxpsicologa(idpsico:number): Observable<any[]>{
    return this.http.get<any[]>(`${this.urllistacitaxpsicologa}/${idpsico}`);
  }
}


