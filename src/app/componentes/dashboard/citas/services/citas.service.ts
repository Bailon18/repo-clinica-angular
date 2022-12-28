import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../usuario/model/usuario';
import { PacienteDTO } from '../model/pacientedto';
import { Citas } from '../model/citas';


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

  buscarcitaid(id:number):Observable<Citas>{
    return this.http.get<Citas>(`${this.urlbuscarcitasID}/${id}`);
  }
}


