import { formatDate } from '@angular/common';
import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Paciente } from '../paciente/models/paciente';
import { Citas, CitasResultado } from './model/citas';
import { CitasService } from './services/citas.service';
import { Usuario } from '../usuario/model/usuario';


import {MatCalendarCellClassFunction} from '@angular/material/datepicker';


@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls:['./citas.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CitasComponent implements OnInit {

    id!:number;
    nombrepsicologa!:string;
    fecha: string;
    psicologos : Usuario[];
    fechatext:string;
    selected: Date | null;

    dateClass:MatCalendarCellClassFunction<Date> ;





    public citas = new Citas();

    

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

    constructor(private servicio: CitasService) { }

    ngOnInit(): void {

        this.validarfechascita();
 
        // solo guardamos la lista pero con psicologos
        this.servicio.listarPsicologas().subscribe(resultado => {
            this.psicologos = resultado.filter(psicologo => {
                let res = psicologo.roles.some( r => r.id === 3 )
                return res;
            })
            console.log("USUARIOS ", this.psicologos);
        })

        this.listacitasresul = this.horadefinida.splice(7,20);
        console.log("LISTAS ", this.listacitasresul)
        this.fechatext = new Date().toLocaleDateString('es-PE', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 
    }

    validarfechascita(){

        // consulta 
        // (fecha, psicologa)
        // return -> lista de dias de esa fecha que tiene cita y luego pintamos
        
        this.dateClass = (cellDate, view) => {
        
            if (view === 'month') {
    
              const date = cellDate.getDate();
              
              return date === 10 || date === 20 ? 'day-active' : '';
            }
        
            return '';
        };
    }



    obtenerfecha(event:any){
        this.fecha = formatDate(event, 'yyyy-MM-dd', 'en-PE').toString();
        this.fechatext = event.toLocaleDateString('es-PE', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 
        console.log("FECHA", this.fecha);
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
        }

    }
    

    listarCitas(id:number , fecha: string){


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

            console.log("LISTA FINAL ", this.listacitasresul);

        }
        )
    }



}
