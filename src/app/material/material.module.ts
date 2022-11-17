import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';




@NgModule({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatDialogModule
  ],

  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatDialogModule

    
  ]
})
export class MaterialModule { }
