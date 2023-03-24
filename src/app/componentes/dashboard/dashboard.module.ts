import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PacienteComponent } from './paciente/paciente.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { CitasComponent } from './citas/citas.component';
import { ReportesComponent } from './reportes/reportes.component';
import { MaterialModule } from '../../material/material.module';
import { CrearComponent } from './usuario/paginas/crear.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormpacienteComponent } from './paciente/paginas/formPaciente/formpaciente.component';
import { ListarsesionesComponent } from './citas/paginas/listarsesiones/listarsesiones.component';
import { DetallecitaComponent } from './citas/paginas/detallecita/detallecita.component';
import { NuevacitaComponent } from './citas/paginas/nuevacita/nuevacita.component';
import { HistorialComponent } from './paciente/historial/historial.component';





@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    NavbarComponent,
    PacienteComponent,
    UsuarioComponent,
    CitasComponent,
    ReportesComponent,
    CrearComponent,
    FormpacienteComponent,
    ListarsesionesComponent,
    DetallecitaComponent,
    NuevacitaComponent,
    HistorialComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
   
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class DashboardModule { }
