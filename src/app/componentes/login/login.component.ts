import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import swall from 'sweetalert2'; // npm install sweetalert2 --save
import { UsuarioService } from '../dashboard/usuario/services/usuario.service';
import { LoginService } from './login.service';
import { Usuario } from '../dashboard/usuario/model/usuario';
import { map } from 'rxjs';




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
        localStorage.setItem('usuario', JSON.stringify(this.usuario))

        if(this.usuario !=null){

          const rolest = this.usuario['roles'];
  
          let mapa= new Map();

          for (let index = 0; index < rolest.length; index++) {
            mapa.set(rolest[index]['descripcion'],rolest[index]['descripcion'] )
          }

  
          if(mapa.size > 1){
            
            (async () => {

              const { value: roles } = await swall.fire({
                html: 'Usted cuenta con mas un rol, Seleccione un rol para iniciar sesión',
                icon:'question',
                input: 'select',
                inputOptions: mapa,
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
                this.setServicioRol(roles)
              }
              
              })()
          }else{
            let roll = (mapa.entries().next().value)[0]
            this.setServicioRol(roll);
          }

        }else{
          swall.fire({icon: 'error',
                      confirmButtonColor:'#0275d8',
                      html:  `Correo o contraseña incorrecto!`,
          })
        }
      },
      error:(error) => {

      }
    });
  }


  setServicioRol(rol: any){

    swall.fire({
      html:`${this.usuario.nombres.toUpperCase()} ${this.usuario.apellidos} Iniciastes sesión como: <strong>${rol}</strong>`,
      confirmButtonColor:'#0275d8'
    }) 
    this.servicio.setRolSesion(rol).subscribe({
      next:(res) => {
        localStorage.setItem('rol', JSON.stringify(res))
      }
    })
    this.router.navigate(['dashboard']);
  }

}
