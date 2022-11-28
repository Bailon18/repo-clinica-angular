import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import swall from 'sweetalert2'; // npm install sweetalert2 --save
import { UsuarioService } from '../dashboard/usuario/usuario.service';
import { LoginService } from './login.service';
import { Usuario } from '../dashboard/usuario/usuario';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent implements OnInit {

  rolSesion: number;
  formulario:FormGroup
  usuario: Usuario;
  rolesSelec: any;

  constructor(private fb:FormBuilder , private _snackBar: MatSnackBar ,private router : Router
    ,private toast: NgToastService, private servicio: LoginService, private serviUser: UsuarioService) { 

    this.formulario = this.fb.group({
      usuario: ['',Validators.required],
      password: ['',Validators.required],
    })
  }

  ngOnInit(): void {
  }

  ingresar(){

    const usuario = this.formulario.value.usuario;
    const password = this.formulario.value.password;

    this.servicio.getValidacion(usuario, password).subscribe({
      
      next:(resultado) => {

        this.usuario = resultado;

        if(this.usuario !=null){

          const rolest = this.usuario['roles'];

          let rolesListaUser = [];
  
          for (let index = 0; index < rolest.length; index++) {
            rolesListaUser.push(rolest[index]['descripcion'])
          }

          if(rolesListaUser.length > 1){
            
            (async () => {

              const { value: roles } = await swall.fire({
                title: 'Usted cuenta con mas un rol, Seleccione un rol para iniciar sesión',
                icon:'question',
                input: 'select',
                inputOptions: {
                  'roles': rolesListaUser
                },
                inputPlaceholder: 'Seleccione el rol',
                confirmButtonColor:'#0275d8',
                showCancelButton: true,
                cancelButtonText:'Cancelar',
                inputValidator: (value) => {
                  return new Promise<void | any>((resolve) => {
                    if (value !== '') {
                      resolve(null);
                    } else {
                      resolve('Tienes que seleccionar un rol')
                    }
                  })
                }
              })

              if (roles) {
                let roless = this.serviUser.getRoles()
                this.setServicioRol(roless[roles].descripcion)
              }
              
              })()
          }else{

            const rolest = this.usuario['roles'];
            this.setServicioRol(rolest[0].descripcion);
          }

        
        }else{
          swall.fire({icon: 'error',
                      title: 'Credenciales incorrectos',
                      text:  `Correo o contraseña incorrecto!`,
          })
        }
      },
      error:(error) => {}
    });

  
  }


  setServicioRol(rol: string){

    swall.fire({
      html:`${this.usuario.nombres.toUpperCase()} ${this.usuario.apellidos} Iniciastes sesión como: <strong>${rol}</strong>`,
      confirmButtonColor:'#0275d8'
    })   //`${this.usuario.nombres} ${this.usuario.apellidos} Iniciado sesión como: ${rol}` )
    this.servicio.setRolSesion(rol).subscribe({
      next:(res) => {
      }
    })
    this.router.navigate(['dashboard']);
  }

}
