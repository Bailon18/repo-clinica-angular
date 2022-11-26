import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import swall from 'sweetalert2'; // npm install sweetalert2 --save



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent implements OnInit {


  formulario:FormGroup

  constructor(private fb:FormBuilder , private _snackBar: MatSnackBar ,private router : Router
    ,private toast: NgToastService) { 

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

    if(usuario === "admin@gmail.com" && password === "admin"){
      this.router.navigate(['dashboard']);
    }else{
      this.toast.error({detail:"Mensaje Error", summary:"Usuario o contraseña es incorrecto", position:"br" , duration:2500})
      this.formulario.reset();
    }
  }


  mensajeError() {
    this._snackBar.open("Usuario o contraseña invalido", 'Invalido', {
      duration:3000,
      horizontalPosition:'center',
      verticalPosition:'bottom'
    });
  }

}
