import { Component, OnInit } from '@angular/core';
import { Roles, Usuario } from '../usuario/model/usuario';
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
      // this.usuario = res;
      // this.roles = this.usuario.roles[0];
      this.usuario = JSON.parse(localStorage.getItem('usuario')!) || [];
    }
    })


    this.servicio.getObtenerRolSesion().subscribe({
      next:(res) => {

        this.rolInicioSesion = JSON.parse(localStorage.getItem('rol')!) || [];

        //this.rolInicioSesion = res;
        console.log("ROL DE INICIO FUE  ", this.rolInicioSesion)
      }
    })
    //this.rolInicioSesion = "Administrador"
  } 

}
