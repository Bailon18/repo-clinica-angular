import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { PacienteComponent } from './paciente/paciente.component';
import { CitasComponent } from './citas/citas.component';
import { ReportesComponent } from './reportes/reportes.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { ListarsesionesComponent } from './citas/paginas/listarsesiones/listarsesiones.component';

const routes: Routes = [
  {path:'', component:DashboardComponent , children:[

    // {path:'', component:InicioComponent},
    {path:'pacientes', component:PacienteComponent},
    {path:'citas', component:CitasComponent},
    // {path:'reportes', component:ReportesComponent},
    {path:'usuarios', component:UsuarioComponent},
    {path:'citaslista', component:ListarsesionesComponent},
    {path:'', redirectTo:'citas', pathMatch:'full'},

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
