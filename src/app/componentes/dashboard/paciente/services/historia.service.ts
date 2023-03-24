import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Afiliacion } from '../models/afiliacion';
import { Historia } from '../models/historia';
import { Diagnostico } from '../models/diagnostico';


@Injectable({
  providedIn: 'root'
})
export class HistoriaService {

  private urlbuscarafiliacion: string = 'http://localhost:8090/afiliacion/validarafiliacion';
  private urlbuscarhistoria: string = 'http://localhost:8090/historia/buscarHistoriaxpaciente';
  private urlbuscardiagnostico: string = 'http://localhost:8090/afiliacion/buscardiagnosticoxhistoria';

  
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http: HttpClient) { }

  buscarafiliacion(id:number):Observable<Afiliacion>{
    return this.http.get<any>(`${this.urlbuscarafiliacion}/${id}`);
  }

  buscarahistoria(id:number):Observable<Historia>{
    return this.http.get<any>(`${this.urlbuscarhistoria}/${id}`);
  }

  buscardiagnostico(idhistoria:number):Observable<Diagnostico>{
    return this.http.get<any>(`${this.urlbuscardiagnostico}/${idhistoria}`);
  }


}
