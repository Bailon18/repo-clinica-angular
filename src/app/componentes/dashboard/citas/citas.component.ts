import { Component, OnInit } from '@angular/core';
import { Paciente } from '../paciente/models/paciente';
import { Citas, CitasResultado } from './model/citas';
import { CitasService } from './services/citas.service';


@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls:['./citas.component.css']
})
export class CitasComponent implements OnInit {

    selected: Date | null;

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

    constructor(private servicio: CitasService) { }

    ngOnInit(): void {

        // hora = form.fecha 
        // id  = form.idpsicologa

        this.servicio.buscarCitas(3, "2022-12-08").subscribe(res =>{
            // [{},{},{},{},{},{}]
            for(let i in res){
                this.horadefinida[res[i].horacita-1].dato = res[i];
            }
            this.horadefinida = this.horadefinida.splice(7,20)

            console.log("DATOS FINALES ", this.horadefinida)
        })

    }

    cambiocombobox(){

    }



}
