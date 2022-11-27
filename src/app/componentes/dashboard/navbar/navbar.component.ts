import { Component, OnInit } from '@angular/core';
import { Roles, Usuario } from '../usuario/usuario';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

  usuario: Usuario = new Usuario();
  roles: Roles = new Roles();
  rolInicioSesion:string;

  constructor(private servicio: LoginService) { }

  ngOnInit(): void {

    this.servicio.getObtenerUsuario().subscribe({
    next:(res) => {
      this.usuario = res;
      this.roles = this.usuario.roles[0];
    }
    })


    this.servicio.getObtenerRolSesion().subscribe({
      next:(res) => {
        this.rolInicioSesion = res;
        console.log("ROL DE INICIO FUE  ", this.rolInicioSesion)
      }
    })

  } 

}
