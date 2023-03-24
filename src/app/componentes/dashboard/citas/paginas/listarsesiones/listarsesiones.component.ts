import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CitasService } from '../../services/citas.service';
import { ListaCitaxPsicologaDTO } from '../../model/listacitasxpsicologadto';

@Component({
  selector: 'app-listarsesiones',
  templateUrl: './listarsesiones.component.html',
  styleUrls: ['./listarsesiones.component.css']
})
export class ListarsesionesComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  columnas: string[] = ['ID', 'NOMBRE', 'APELLIDOS', 'DNI', 'FECHA CITA', 'ESTADO CITA', 'ACCIONES'];
  
  dataSource = new MatTableDataSource<any>;

  rolInicioSesion:string;

  constructor(private servicio: CitasService) { }

  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Paginas';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Atras';
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {

    //this.rolInicioSesion = JSON.parse(localStorage.getItem('rol')!) || [];

    // idpsicologa actual

    this.servicio.listarcitasxpsicologa(1).subscribe(
      {next: res => {

          console.log("res ", res )
          this.dataSource = new MatTableDataSource(res)
          this.dataSource.paginator = this.paginator;
          },
          error: error => {
          console.log("Ocurrio un error en la carga")
          }
      }
  )


  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
