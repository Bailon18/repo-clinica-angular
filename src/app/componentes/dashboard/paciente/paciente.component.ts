import { Component, OnInit } from '@angular/core';
import { PacienteService } from './services/paciente.service';
import { Ocupacion } from './models/ocupacion';
import { EstadoCivil } from './models/estadoCivil';
import { Paciente } from './models/paciente';

import { AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';



@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls:['./paciente.component.css'],

})
export class PacienteComponent implements AfterViewInit, OnInit {


  ocupaciones: Ocupacion[];
  estadoCivil: EstadoCivil[];
  pacientes: Paciente[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  columnas: string[] = ['ID', 'NOMBRE', 'APELLIDOS', 'DNI', 'TELEFONO', 'DISTRITO', 'ACCIONES'];
  dataSource = new MatTableDataSource<Paciente>;

  constructor(private servicio: PacienteService) { }

  ngOnInit(): void {

    this.servicio.getOcupaciones().subscribe({
      next:(res) =>{
        this.ocupaciones = res;
      }
    })

    this.servicio.getEstadoCivil().subscribe({
      next:(res) =>{
        this.estadoCivil = res;
      }
    })

    this.servicio.getPacientes().subscribe({
      next:(res) =>{
        console.log("PAC ",res)
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Paginas';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Atras';
    this.dataSource.paginator = this.paginator;
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  abrirDialogoNuevoPaciente() {

  }

}
