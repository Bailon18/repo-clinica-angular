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

  private urlbuscarafiliacion: string = 'https://repo-clinicaa-spring-production.up.railway.app/afiliacion/validarafiliacion';
  private urlbuscarhistoria: string = 'https://repo-clinicaa-spring-production.up.railway.app/historia/buscarHistoriaxpaciente';
  private urlbuscardiagnostico: string = 'https://repo-clinicaa-spring-production.up.railway.app/afiliacion/buscardiagnosticoxhistoria';
  private urlactualizarafili: string = 'https://repo-clinicaa-spring-production.up.railway.app/afiliacion/actualizarafiliacion';
  private urlactualizarhistori: string = 'https://repo-clinicaa-spring-production.up.railway.app/historia/actualizarhistoria';
  private urlguardarhistoria: string = 'https://repo-clinicaa-spring-production.up.railway.app/historia/guardarhistoria';


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

  actualizarafiliacion(afi:Afiliacion):Observable<Afiliacion>{
    return this.http.put<Afiliacion>(this.urlactualizarafili, afi, {headers: this.httpHeaders});
  }


  guardarhistoria(his:Historia):Observable<Historia>{
    return this.http.post<Historia>(this.urlguardarhistoria, his, {headers: this.httpHeaders});
  }


  actualizarhistoria(his:Historia):Observable<Historia>{
    return this.http.put<Historia>(this.urlactualizarhistori, his, {headers: this.httpHeaders});
  }

}
