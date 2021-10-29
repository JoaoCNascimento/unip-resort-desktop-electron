import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuartosRoutingModule } from './quartos-routing.module';
import { QuartosComponent } from '../quartos.component';
import { CategoriaComponent } from '../categoria/categoria.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    QuartosComponent,
    CategoriaComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QuartosRoutingModule
  ]
})
export class QuartosModule { }
