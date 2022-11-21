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
    this.getUsuarioss();
    console.log("USUARIOS:  ", this.getUsuarioss())
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

  getUsuarioss(){
    return this.servicio.getUsuarios().subscribe(
      res => this.dataSource = new MatTableDataSource(res)
    )
  }

  cargarUsuario(){
    return this.servicio.getUsuario();
  }
  
  abrirDialogoNuevoUsuario() {
    // this.dialog.open(CrearComponent, {
    //     width:'470px',
    // }).afterClosed().subscribe(valor =>{
    //   if (valor === 'guardar') {
    //     this.dataSource = new MatTableDataSource<Usuario>(this.cargarUsuario());
    //     this.dataSource.paginator = this.paginator;
    //   }
    // });
  }

  editarUsuario(fila: any){
    // this.dialog.open(CrearComponent,{
    //   width:'470px',
    //   data:fila
    // }).afterClosed().subscribe(valor =>{
    //   if (valor === 'actualizar') {
    //     this.dataSource = new MatTableDataSource<Usuario>(this.cargarUsuario());
    //     this.dataSource.paginator = this.paginator;
    //   }
    // });
  }

}


