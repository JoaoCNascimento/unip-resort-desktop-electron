import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManutencaoRoutingModule } from './manutencao-routing.module';
import { ManutencaoComponent } from '../manutencao.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ManutencaoComponent
  ],
  imports: [
    CommonModule,
    ManutencaoRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class ManutencaoModule { }
