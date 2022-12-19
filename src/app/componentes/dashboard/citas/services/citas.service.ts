import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Citas } from '../model/citas';
import { Usuario } from '../../usuario/model/usuario';


@Injectable({
  providedIn: 'root'
})
export class CitasService {

  private urlbuscarcitas: string = 'http://localhost:8090/citas/buscarcitas';
  private urlListar: string = 'http://localhost:8090/usuario/listar';
  private urldias : string ='http://localhost:8090/citas/listardias';
  private urlpacientecita : string ='http://localhost:8090/paciente/pagendar/';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient) { }

  buscarCitas(id:number, fecha:Date): Observable<Citas[]>{
    return this.http.get<Citas[]>(`${this.urlbuscarcitas}/${id}/${fecha}`);
  }

  buscarpacientecitas(id:number, fecha:Date): Observable<Citas[]>{
    return this.http.get<Citas[]>(`${this.urlbuscarcitas}/${id}/${fecha}`);
  }

  listarPsicologas(): Observable<Usuario[]>{
      return this.http.get<Usuario[]>(this.urlListar);
  }

  listardias(mes: number): Observable<number[]>{
    return this.http.get<number[]>(`${this.urldias}/${mes}`);
  }
}


