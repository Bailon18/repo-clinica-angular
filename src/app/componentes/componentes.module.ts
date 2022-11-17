import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';





@NgModule({
  declarations: [
    LoginComponent,
  ],
  exports:[
    LoginComponent,
  ]
  ,
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule
  ]
})
export class ComponentesModule { }
