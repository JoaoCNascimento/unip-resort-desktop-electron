import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuartosRoutingModule } from './quartos-routing.module';
import { QuartosComponent } from '../quartos.component';
import { CategoriaComponent } from '../categoria/categoria.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdministrarQuartosComponent } from '../administrar-quartos/administrar-quartos.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    QuartosComponent,
    CategoriaComponent,
    AdministrarQuartosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QuartosRoutingModule,
    FontAwesomeModule
  ]
})
export class QuartosModule { }
