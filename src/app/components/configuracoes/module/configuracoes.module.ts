import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracoesRoutingModule } from './configuracoes-routing.module';
import { ConfiguracoesComponent } from '../configuracoes.component';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ConfiguracoesComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    ConfiguracoesRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule
  ]
})
export class ConfiguracoesModule { }
