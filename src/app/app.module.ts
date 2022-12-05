import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentesModule } from './componentes/componentes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http'; // add this line
import { FormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';





@NgModule({
  // los componentes que contiene el modulo APP
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentesModule,
    BrowserAnimationsModule,
    HttpClientModule, //add this line
    FormsModule,
    NgToastModule,
   

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// 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
// 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