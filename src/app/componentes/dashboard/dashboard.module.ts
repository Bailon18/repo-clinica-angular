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
import { CrearComponent } from './usuario/crear/crear.component';



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
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule
  ]
})
export class DashboardModule { }
