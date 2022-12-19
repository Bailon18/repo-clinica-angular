import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listarsesiones',
  templateUrl: './listarsesiones.component.html',
  styleUrls: ['./listarsesiones.component.css']
})
export class ListarsesionesComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  columnas: string[] = ['ID', 'NOMBRE', 'APELLIDOS', 'DNI', 'TELEFONO', 'DISTRITO', 'ACCIONES'];
  dataSource = new MatTableDataSource<any>;

  rolInicioSesion:string;

  constructor() { }

  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Paginas';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Atras';
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {

    this.rolInicioSesion = JSON.parse(localStorage.getItem('rol')!) || [];
  }

}
