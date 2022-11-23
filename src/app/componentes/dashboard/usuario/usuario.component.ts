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
export class UsuarioComponent implements AfterViewInit , OnInit{
  


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  columnas: string[] = ['ID', 'NOMBRE', 'APELLIDOS', 'DNI', 'CORREO', 'ESTADO', 'SEXO', 'ROL','ACCIONES'];
  dataSource = new MatTableDataSource<Usuario>;

  constructor(private servicio:UsuarioService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.listarUsuarios();
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

  listarUsuarios(){
    return this.servicio.getUsuarios().subscribe(
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

  cargarUsuario(){
    return this.servicio.getUsuarios();
  }
  
  abrirDialogoNuevoUsuario() {
    this.dialog.open(CrearComponent, {
         width:'470px',
     }).afterClosed().subscribe(valor =>{
        if (valor === 'guardar') {
          this.listarUsuarios();
       }
    });
  }

  editarUsuario(fila: any){
    this.dialog.open(CrearComponent,{
      width:'470px',
      data:fila
    }).afterClosed().subscribe(valor =>{
      if (valor === 'actualizar') {
        this.listarUsuarios();
      }
    });
  }

}


