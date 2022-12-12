import { formatDate } from '@angular/common';
import { Component, OnChanges, OnInit , SimpleChanges, ViewEncapsulation} from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Paciente } from '../paciente/models/paciente';
import { Citas, CitasResultado } from './model/citas';
import { CitasService } from './services/citas.service';
import { Usuario } from '../usuario/model/usuario';


import {MatCalendarCellClassFunction} from '@angular/material/datepicker';
import { map } from 'rxjs';


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
    
    dateClass:MatCalendarCellClassFunction<Date> ;
    mesactual:number;


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


    funcion():MatCalendarCellClassFunction<Date>{


        //this.dato = JSON.parse(localStorage.getItem('mes')!) || [];
     
        //localStorage.setItem('mes', JSON.stringify(this.dato))

        //let dato2 = JSON.parse(localStorage.getItem('mes')!) || [];

        //console.log("MES ACTUAL 2 ", dato2);
        //console.log("funcion")

        this.dateClass = (cellDate, view) => {

            console.log("Dateclass",);
            
            if (view === 'month') {

                //let mesesito = JSON.parse(localStorage.getItem('mes')!) || [];
                let dias = JSON.parse(localStorage.getItem('dias')!) || []

                
                
                // if(mes != undefined){
                    
                //     //console.log("cellDate.getMonth()+1 ", cellDate.getMonth()+1)
                //     //console.log("MES ", mesesito)
                //     //console.log("dias ", dias)
                    

                //     if(cellDate.getMonth()+1 === 12 ){

                //         //console.log("INGRESO")
                    
                //         let date = cellDate.getDate();
                        
                //         let dias = JSON.parse(localStorage.getItem('dias')!) || []

                    
                //         for(let i of dias){
        
                //             if(date == i){
                //                 return 'day-active';
                //             }
                //         } 
                //     }
                // }
            
            }
            return '';

        }

        

        return this.dateClass;
        
    }



    constructor(private servicio: CitasService) {
     }



    ngOnInit(): void {

        localStorage.setItem('mes', JSON.stringify(12));

        this.funcion();

        this.servicio.listarPsicologas().subscribe(resultado => {
            this.psicologos = resultado.filter(psicologo => {
                let res = psicologo.roles.some( r => r.id === 3 )
                return res;
            })
            //console.log("USUARIOS ", this.psicologos);
        })

        this.listacitasresul = this.horadefinida.splice(7,20);
        //console.log("LISTAS ", this.listacitasresul)
        this.fechatext = new Date().toLocaleDateString('es-PE', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 
        
    }


    validarfechascita(){

        let mes = JSON.parse(localStorage.getItem('mes')!) || [];

        //console.log("MES ACTUAL EN validar ", mes);

        this.servicio.listardias(mes).subscribe(res => {
            localStorage.setItem('dias', JSON.stringify(res))
        });

        //this.dias = JSON.parse(localStorage.getItem('dias')!) || [];
        //console.log("DIAS en validar ", this.dias);

        this.funcion();
    }

    holaaa(event:any){

        let calendario = document.getElementById("calendario")?.innerText.slice(0,3).toString().trim();

        let mapa= new Map();

        mapa.set("JAN",1);
        mapa.set("FEB",2)
        mapa.set("MAR",3)
        mapa.set("APR",4)
        mapa.set("MAY",5)
        mapa.set("JUN",6)
        mapa.set("JUL",7)
        mapa.set("AUG",8)
        mapa.set("SEP",9)
        mapa.set("OCT",10)
        mapa.set("NOV",11)
        mapa.set("DEC",12)
        
        let mes;
        
        for (let clave of mapa.keys()) {
            
            if(clave === calendario)
                mes = mapa.get(calendario);
                
            
        }

        //console.log("Ddddddddd ", mes);
        localStorage.setItem('mes', JSON.stringify(mes))
        this.validarfechascita();
        
     
        
    }

    obtenerfecha(event:any){

        this.fecha = event
        this.fechatext = event.toLocaleDateString('es-PE', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 
        //console.log("FECHJA ", this.fechatext)
        this.valirdarenviodatos();
    }

    obtenerpsicologo(event:any){
        console.log("EVENTO COMBOBOX")
        this.id = event.id;
        this.nombrepsicologa = event.nombres +" "+ event.apellidos
        console.log("ID ", this.id);

    
        // if(this.fecha == undefined)
        //     fechadefaul = new Date().getMonth()+1;
        //     this.validarfechascita(fechadefaul);
        

    }

    valirdarenviodatos(){

        //this.validarfechascita(new Date().getMonth()+1)

        if(this.fecha != null && this.id != null){
            this.listarCitas(this.id, this.fecha);

            
        }

    }
    

    listarCitas(id:number , fecha: Date){
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
