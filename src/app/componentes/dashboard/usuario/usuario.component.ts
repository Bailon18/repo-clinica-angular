import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Usuario, Roles } from './model/usuario';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { UsuarioService } from './services/usuario.service';
import {MatDialog} from '@angular/material/dialog';
import { CrearComponent } from './paginas/crear.component';
import swall from 'sweetalert2';



@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls:['./usuario.component.css']
})
export class UsuarioComponent implements AfterViewInit , OnInit{
  
  estadoFiltro:any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  columnas: string[] = ['ID', 'NOMBRE', 'APELLIDOS', 'CORREO', 'ESTADO', 'ROL','ACCIONES'];
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
        let filtrado = res.filter(u => u.estado =="Activo")
        this.dataSource = new MatTableDataSource(filtrado)
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

  bloquearUsuario(fila:any): void{

    swall.fire({
      html: `¿Estas seguro de bloquear a <strong>${fila.nombres} ${fila.apellidos}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0275d8',
      cancelButtonColor: '#9c9c9c',
      confirmButtonText: 'Si, bloquear!',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.servicio.bloquearUsuarioServi(fila).subscribe({
          next:(res) => {
            this.listarUsuarios();
          },
          error:(error) => {
            console.log("Ocurrio un error")
          }
        })

        swall.fire({
          icon:'success',
          html:'Usuario bloqueado con exito!'
        }
        )
      } 
    })
  }

  mostrarInactivos(){

    if(!this.estadoFiltro){

    this.servicio.getUsuarios().subscribe(
      {next: res => {
        let filtrado = res.filter(u => u.estado=="Inactivo")
        this.dataSource = new MatTableDataSource(filtrado)
        this.dataSource.paginator = this.paginator;
        },
        error: error => {
          console.log("Ocurrio un error en la carga")
        }
      }
    )
      
    }else{
      this.listarUsuarios();
      
    }
  }

}


