import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentesModule } from './componentes/componentes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  // los componentes que contiene el modulo APP
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentesModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// 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
// 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