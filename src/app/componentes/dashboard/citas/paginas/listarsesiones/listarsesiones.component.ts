import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CitasService } from '../../services/citas.service';
import { ListaCitaxPsicologaDTO } from '../../model/listacitasxpsicologadto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Usuario } from '../../../usuario/model/usuario';

@Component({
  selector: 'app-listarsesiones',
  templateUrl: './listarsesiones.component.html',
  styleUrls: ['./listarsesiones.component.css']
})
export class ListarsesionesComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  columnas: string[] = ['ID', 'NOMBRE', 'APELLIDOS', 'DNI', 'FECHA CITA', 'ESTADO CITA'];
  
  dataSource = new MatTableDataSource<any>;

  rolInicioSesion:string;

  psicologa:Usuario;

  listaForm !: FormGroup;

  constructor(private formbuilder: FormBuilder, private servicio: CitasService) { }

  ngAfterViewInit(): void {
    this.paginator._intl.itemsPerPageLabel = 'Paginas';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Atras';
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {

    this.psicologa = JSON.parse(localStorage.getItem('usuario')!) || [];

    //console.log('id psico ', this.psicologa.id);

    this.listaForm = this.formbuilder.group({
      fechainicio:[''],
      fechafinal : [''],
    }
    )

    this.servicio.listarcitasxpsicologa(this.psicologa.id).subscribe(
      
      {next: res => {
          this.dataSource = new MatTableDataSource(res)
          this.dataSource.paginator = this.paginator;
          },
          error: error => {
          }
      }
    )
  }


  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  obtenerfecha(event: any){

    let fechainicio = this.listaForm.value['fechainicio'];
    let fechafinal = this.listaForm.value['fechafinal'];


    if(fechainicio && fechafinal){

      this.servicio.buscarcitasporfechas(fechainicio, fechafinal, this.psicologa.id).subscribe(
      
        {next: res => {
            this.dataSource = new MatTableDataSource(res)
            this.dataSource.paginator = this.paginator;
            console.log("RES ", res)
            },
            error: error => {
            }
        }
      )
    }
    
  }


}
