import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FuncionariosComponent } from '../funcionarios.component';
import { FuncionariosRoutingModule } from './funcionarios-routing.module';
import { CadastrarComponent } from '../cadastrar/cadastrar.component';
import { CargosComponent } from '../cargos/cargos.component';
import { EditarComponent } from '../editar/editar.component';
import { ConsultarComponent } from '../consultar/consultar.component';
import { CepService } from 'src/app/services/cep.service';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    FuncionariosComponent,
    CadastrarComponent,
    ConsultarComponent,
    EditarComponent,
    CargosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FuncionariosRoutingModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [
    CepService
  ]
})
export class FuncionariosModule { }
