
import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import { Citas, CitasResultado } from './model/citas';
import { CitasService } from './services/citas.service';
import { Usuario } from '../usuario/model/usuario';
import {MatCalendarCellClassFunction} from '@angular/material/datepicker';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NuevacitaComponent } from './paginas/nuevacita/nuevacita.component';



@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls:['./citas.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CitasComponent implements OnInit {

    id!:number;
    nombrepsicologa!:string;
    fecha!: Date;
    psicologos : Usuario[];
    fechatext:string;
    selected: Date | null;
    public citas = new Citas();
    public resul:any[];
    dias:number[];
    dato:number;
    rolInicioSesion:string;
    
    public horadefinida:CitasResultado[]= [
        {hora:1, formato:"1:00 AM", dato:this.citas}, {hora:1, formato:"2:00 AM", dato:this.citas}, {hora:1, formato:"3:00 AM", dato:this.citas},
        {hora:1, formato:"4:00 AM", dato:this.citas},{hora:1, formato:"5:00 AM", dato:this.citas}, {hora:1, formato:"6:00 AM", dato:this.citas},
        {hora:1, formato:"7:00 AM", dato:this.citas},{hora:1, formato:"8:00 AM", dato:this.citas}, {hora:1, formato:"9:00 AM", dato:this.citas},
        {hora:1, formato:"10:00 AM", dato:this.citas}, {hora:1, formato:"11:00 AM", dato:this.citas},{hora:1, formato:"12:00 PM", dato:this.citas},
        {hora:1, formato:"13:00 PM", dato:this.citas}, {hora:1, formato:"14:00 PM", dato:this.citas}, {hora:1, formato:"15:00 PM", dato:this.citas}, 
        {hora:1, formato:"16:00 PM", dato:this.citas}, {hora:1, formato:"17:00 PM", dato:this.citas},{hora:1, formato:"18:00 PM", dato:this.citas},
        {hora:1, formato:"19:00 AM", dato:this.citas}
        ]

    public listacitasresul:any[];


    constructor(private servicio: CitasService,public dialog: MatDialog ) {
    }

    ngOnInit(): void {

        this.servicio.listarPsicologas().subscribe(resultado => {
            this.psicologos = resultado.filter(psicologo => {
                let res = psicologo.roles.some( r => r.descripcion === "Psicologo" )
                return res;
            })
        })

        this.listacitasresul = this.horadefinida.splice(7,20);
        this.fechatext = new Date().toLocaleDateString('es-PE', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
        
        this.rolInicioSesion = JSON.parse(localStorage.getItem('rol')!) || [];
        console.log("ROL ", this.rolInicioSesion)
        
    }

    obtenerfecha(event:any){

        this.fecha = event
        this.fechatext = event.toLocaleDateString('es-PE', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 
        this.valirdarenviodatos();
    }

    obtenerpsicologo(event:any){

        this.id = event.id;
        this.nombrepsicologa = event.nombres +" "+ event.apellidos
        console.log("ID ", this.id);
        this.valirdarenviodatos();
    }

    valirdarenviodatos(){

        if(this.fecha != null && this.id != null){
            this.listarCitas(this.id, this.fecha);

            // aqui guardamos la fecha acutal - psicologa

        }
    }
    

    listarCitas(id:number , fecha: Date){

        let datoscita=[this.id, this.fechatext];

        localStorage.setItem('datoscita', JSON.stringify(datoscita))

        console.log("LLEGOOOO")

        this.servicio.buscarCitas(id, fecha).subscribe(res =>{

            this.listacitasresul = [
                {hora:1, formato:"1:00 AM", dato:this.citas}, {hora:1, formato:"2:00 AM", dato:this.citas}, {hora:1, formato:"3:00 AM", dato:this.citas},
                {hora:1, formato:"4:00 AM", dato:this.citas},{hora:1, formato:"5:00 AM", dato:this.citas}, {hora:1, formato:"6:00 AM", dato:this.citas},
                {hora:1, formato:"7:00 AM", dato:this.citas},{hora:1, formato:"8:00 AM", dato:this.citas}, {hora:1, formato:"9:00 AM", dato:this.citas},
                {hora:1, formato:"10:00 AM", dato:this.citas}, {hora:1, formato:"11:00 AM", dato:this.citas},{hora:1, formato:"12:00 PM", dato:this.citas},
                {hora:1, formato:"13:00 PM", dato:this.citas}, {hora:1, formato:"14:00 PM", dato:this.citas}, {hora:1, formato:"15:00 PM", dato:this.citas}, 
                {hora:1, formato:"16:00 PM", dato:this.citas}, {hora:1, formato:"17:00 PM", dato:this.citas},{hora:1, formato:"18:00 PM", dato:this.citas},
                {hora:1, formato:"19:00 AM", dato:this.citas}
                ]

            if(res.length > 0){
                for(let i in res){
                    this.listacitasresul[res[i].horacita-1].dato = res[i];
                }
                this.listacitasresul = this.listacitasresul.splice(7,20);
            }else{

                this.listacitasresul = this.listacitasresul.splice(7,20);
            }
        }
        )
    }


    abrirmodalnuevacita(){
        
        this.dialog.open(NuevacitaComponent, {
            width:'470px',
        }).afterClosed().subscribe(valor =>{
           if (valor === 'guardar') {
             
          }
       });

    }


}
