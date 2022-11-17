import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Usuario, Roles } from './usuario';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { UsuarioService } from './usuario.service';
import {MatDialog} from '@angular/material/dialog';
import { CrearComponent } from './crear/crear.component';



@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls:['./usuario.component.css']
})
export class UsuarioComponent implements AfterViewInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private servicio:UsuarioService, public dialog: MatDialog) {
  }

  columnas: string[] = ['ID', 'NOMBRE', 'APELLIDOS', 'DNI', 'CORREO', 'ESTADO', 'SEXO', 'ROL','ACCIONES'];
  dataSource = new MatTableDataSource<Usuario>(this.cargarUsuario());

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

  cargarUsuario(){
    return this.servicio.getUsuario();
  }
  
  abrirDialogoNuevoUsuario() {
  
    this.dialog.open(CrearComponent, {
        width:'35%',
        height:'63%'
    });
  }


}


