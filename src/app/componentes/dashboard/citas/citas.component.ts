
import { Component, OnInit , ViewEncapsulation} from '@angular/core';
import { Citas, CitasResultado } from './model/citas';
import { CitasService } from './services/citas.service';
import { Usuario } from '../usuario/model/usuario';
import swall from 'sweetalert2'; // npm install sweetalert2 --save
import { MatDialog } from '@angular/material/dialog';
import { NuevacitaComponent } from './paginas/nuevacita/nuevacita.component';
import { FormpacienteComponent } from '../paciente/paginas/formPaciente/formpaciente.component';
import { DetallecitaComponent } from './paginas/detallecita/detallecita.component';
import { CitasDTO } from './model/citasdto';



@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls:['./citas.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CitasComponent implements OnInit {

    id!:number;
    nombrepsicologa!:string;
    fecha: Date = new Date();

    psicologos : Usuario[];
    fechatext:string;
    selected: Date = new Date();
    public citas = new Citas();
    public resul:any[];
    dias:number[];
    dato:number;
    rolInicioSesion:string;

    estadohistoria:string = "SI";

    datoedit:CitasDTO;
    
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


        // si el rol de inicio es Psicologo -> llamamos automaticamente el listar citas 
        // * sin necesidad de estar seleccionado la psicologa y la fecha
        if(this.rolInicioSesion == 'Psicologo'){

            let psicologa = JSON.parse(localStorage.getItem('usuario')!) || [];
            this.nombrepsicologa = psicologa.nombres +" "+ psicologa.apellidos
            let fechaactual = new Date();
            // console.log("PSICOLOGO ID ",psicologa.id);
            // console.log("FECHA ACTUAL ", fechaactual);

            this.listarCitas(psicologa.id, fechaactual)

        }
 
    }

    obtenerfecha(event:any){

        this.fecha = event
        this.fechatext = event.toLocaleDateString('es-PE', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 

        // en el evento de seleccionar fecha -> consultamos si el rol de inicio actual es == Psicologo
        // si es correcto -> obtenemos el id del psicologo que esta guardado en localstorage
        if(this.rolInicioSesion == 'Psicologo'){
            let psicologa = JSON.parse(localStorage.getItem('usuario')!) || [];
            this.id = psicologa.id;
        }

        this.valirdarenviodatos();
    }

    obtenerpsicologo(event:any){

        this.id = event.id;
        this.nombrepsicologa = event.nombres +" "+ event.apellidos
        this.valirdarenviodatos();
    }

    valirdarenviodatos(){
        if(this.fecha != null && this.id != null){
            this.listarCitas(this.id, this.fecha);
        }
    }
    
    abrirmodaleditarcita(dato:any){
        
        this.servicio.buscarcitaid(dato.dato.id).subscribe( res => {
            //console.log("Resultado de busqueda ", res);
            this.datoedit = res;
            //localStorage.setItem('datosedicioncita', JSON.stringify(ress))
            this.dialog.open(DetallecitaComponent, {
                width:'30%',
                data:this.datoedit
            }).afterClosed().subscribe(valor =>{
                this.listarCitas(this.id, this.fecha);
            });
    
        })
    }

    abrirmodalnuevacita(dato:any){

        if(this.fecha != null && this.id != null){

            let datoscita=[this.id,this.nombrepsicologa, this.fecha, dato.formato];

            localStorage.setItem('datoscita', JSON.stringify(datoscita))

            this.dialog.open(NuevacitaComponent, {
                width:'470px',
            }).afterClosed().subscribe(valor =>{
              
                this.listarCitas(this.id, this.fecha);
              
           });

        }else{
            swall.fire({icon: 'warning',
            confirmButtonColor:'#0275d8',
            html:  `Para agendar se requiere fecha y psicologo!`,
            })
        }
 
    }

    // este formulario esta dentro de PACIENTE/PAGINAS/
    abrirDialogoNuevoPaciente() {
        
        this.dialog.open(FormpacienteComponent, {
            width:'27%',
        }).afterClosed().subscribe(valor =>{

            // // despues de guardar el paciente -> abre automaticamente el  modal de nueva cita 
            // this.dialog.open(NuevacitaComponent, {
            //     width:'470px',
            // }).afterClosed().subscribe(valor =>{
                
            // });
            
        });
    }

    listarCitas(id:number , fecha: Date){
        this.servicio.buscarCitas(id, fecha).subscribe(res =>{

            console.log("CITAS ", res)

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


    eliminarcita(dato:any){
    

        swall.fire({
            html: `¿Estas seguro de eliminar la cita del paciente <strong>${dato.dato.paciente.nombre} ${dato.dato.paciente.apellidos}</strong>?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0275d8',
            cancelButtonColor: '#9c9c9c',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText:'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
      
              this.servicio.eliminarcita(dato.dato.id).subscribe({
                next:(res) => {
                    this.listarCitas(this.id, this.fecha);
                },
                error:(error) => {
                  console.log("Ocurrio un error")
                }
              })
      
              swall.fire({
                icon:'success',
                html:'Cita eliminado con exito!'
              }
              )
            } 
          })

    }

}
