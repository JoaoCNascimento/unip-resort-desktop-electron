import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuartosRoutingModule } from './quartos-routing.module';
import { QuartosComponent } from '../quartos.component';
import { CategoriaComponent } from '../categoria/categoria.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModificarCategoriaComponent } from '../categoria/modificar-categoria/modificar-categoria.component';
import { CriarCategoriaComponent } from '../categoria/criar-categoria/criar-categoria.component';

@NgModule({
  declarations: [
    QuartosComponent,
    CategoriaComponent,
    ModificarCategoriaComponent,
    CriarCategoriaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QuartosRoutingModule
  ]
})
export class QuartosModule { }
