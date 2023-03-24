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
  private urlactualizarafili: string = 'http://localhost:8090/afiliacion/actualizarafiliacion';
  private urlactualizarhistori: string = 'http://localhost:8090/historia/actualizarhistoria';
  private urlguardarhistoria: string = 'http://localhost:8090/historia/guardarhistoria';

  
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
