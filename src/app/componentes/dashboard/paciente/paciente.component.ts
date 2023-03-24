import { Component, OnInit, OnDestroy } from '@angular/core';
import { PacienteService } from './services/paciente.service';
import { Ocupacion } from './models/ocupacion';
import { EstadoCivil } from './models/estadoCivil';
import { Paciente } from './models/paciente';

import { AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { FormpacienteComponent } from './paginas/formPaciente/formpaciente.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HistorialComponent } from './historial/historial.component';




@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls:['./paciente.component.css'],

})
export class PacienteComponent implements AfterViewInit, OnInit {
    
    pacientes: Paciente[];

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    columnas: string[] = ['ID', 'NOMBRE', 'APELLIDOS', 'DNI', 'TELEFONO', 'DISTRITO', 'ACCIONES'];
    dataSource = new MatTableDataSource<Paciente>;

    constructor(private servicio: PacienteService, public dialog: MatDialog) { }

    ngOnInit(): void {

        this.servicio.getOcupaciones().subscribe(
            res => localStorage.setItem('ocupaciones', JSON.stringify(res))
        )

        this.servicio.getEstadoCivil().subscribe(
            res =>localStorage.setItem('estadocivil', JSON.stringify(res))
        )

        this.listarPaciente();
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
        
        this.dialog.open(FormpacienteComponent, {
            width:'25%',
        }).afterClosed().subscribe(valor =>{
            if (valor === 'guardar') {
                this.listarPaciente();
            }
        });
    }

    abrirDialogoEditarPaciente(fila: any){
        this.dialog.open(FormpacienteComponent,{
            width:'25%',
            data:fila
        }).afterClosed().subscribe(valor =>{
            if (valor === 'actualizar') {
                this.listarPaciente();
            }
        });
    }


    // datos 
    verDetallehistoria(fila:any){
        this.dialog.open(HistorialComponent,{
            width:'40%',
            height:'70%',
            data:fila,

        }).afterClosed().subscribe(valor =>{
                this.listarPaciente();
        });
    }

    listarPaciente(){
        return this.servicio.getPacientes().subscribe(
            {next: res => {
                this.dataSource = new MatTableDataSource(res)
                this.dataSource.paginator = this.paginator;
                },
                error: error => {
                console.log("Ocurrio un error en la carga")
                }
            }
        )
    }

}
