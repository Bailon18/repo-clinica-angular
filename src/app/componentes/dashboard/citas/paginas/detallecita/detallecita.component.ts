import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Citas } from '../../model/citas';
import { CitasService } from '../../services/citas.service';

@Component({
  selector: 'app-detallecita',
  templateUrl: './detallecita.component.html',
  styleUrls: ['./detallecita.component.css']
})
export class DetallecitaComponent implements OnInit {

  citaForm : FormGroup;
  datosetear : any [];
  listacitasresul:any[];
  public citas = new Citas();
  fecha: Date;
  hora: number;

  constructor(private formbuilder: FormBuilder, private servicio: CitasService) { }

  ngOnInit(): void {

    
    this.citaForm = this.formbuilder.group({

      idpsicologo:['',Validators.required],
      idpaciente : ['', Validators.required],
      fechacita: ['',Validators.required], //text -> fecha automatico
      hora:['', Validators.required], // text -> hora automatico
      modalidad: ['', Validators.required], // combobox - manual -> Virtual Presencial
      psicologo:[{value: '', disabled: true}], // text -> paciente automatico
      paciente:[{value: '', disabled: true}], //
      nota:[''],
      estadocita:['', Validators.required],
      servicios:['', Validators.required],
        
    });

    this.listacitasresul = [
      {hora:1, formato:"1:00 AM", dato:this.citas}, {hora:1, formato:"2:00 AM", dato:this.citas}, {hora:1, formato:"3:00 AM", dato:this.citas},
      {hora:1, formato:"4:00 AM", dato:this.citas},{hora:1, formato:"5:00 AM", dato:this.citas}, {hora:1, formato:"6:00 AM", dato:this.citas},
      {hora:1, formato:"7:00 AM", dato:this.citas},{hora:1, formato:"8:00 AM", dato:this.citas}, {hora:1, formato:"9:00 AM", dato:this.citas},
      {hora:1, formato:"10:00 AM", dato:this.citas}, {hora:1, formato:"11:00 AM", dato:this.citas},{hora:1, formato:"12:00 PM", dato:this.citas},
      {hora:1, formato:"13:00 PM", dato:this.citas}, {hora:1, formato:"14:00 PM", dato:this.citas}, {hora:1, formato:"15:00 PM", dato:this.citas}, 
      {hora:1, formato:"16:00 PM", dato:this.citas}, {hora:1, formato:"17:00 PM", dato:this.citas},{hora:1, formato:"18:00 PM", dato:this.citas},
      {hora:1, formato:"19:00 AM", dato:this.citas}
      ]

  }

  obtenerfecha(event:any){

    this.fecha = event.value
    //let fechatext = event.value.toLocaleDateString('es-PE', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
    
    //this.valirdarenviodatos();
    this.listarCitas()

}

  obtenerhora(event:any){

    this.hora = event
    console.log("HORA ", this.hora)
    //this.hora = event.s
    //this.listarCitas()
  }


  listarCitas(){

    this.servicio.buscarCitas(3, this.fecha).subscribe(res =>{

        //console.log("CITAS ", res)

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

        console.log("CITASSS ", this.listacitasresul)
    }
    )
}

}
