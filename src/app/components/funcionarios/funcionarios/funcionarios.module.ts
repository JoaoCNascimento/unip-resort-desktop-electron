import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FuncionariosComponent } from '../funcionarios.component';
import { FuncionariosRoutingModule } from './funcionarios-routing.module';
import { CadastrarComponent } from '../cadastrar/cadastrar.component';
import { ConsultarComponent } from '../consultar/consultar.component';
import { CepService } from 'src/app/services/cep.service';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CpfPipe } from 'src/app/pipes/cpf.pipe';
import { RgPipe } from 'src/app/pipes/rg.pipe';

@NgModule({
  declarations: [
    FuncionariosComponent,
    CadastrarComponent,
    ConsultarComponent,
    CpfPipe,
    RgPipe
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
