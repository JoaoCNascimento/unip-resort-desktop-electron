import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailRoutingModule } from './email-routing.module';
import { EmailComponent } from '../email.component';
import { EmailClienteComponent } from '../email-cliente/email-cliente.component';
import { EmailFuncionarioComponent } from '../email-funcionario/email-funcionario.component';

@NgModule({
  declarations: [
    EmailComponent,
    EmailClienteComponent,
    EmailFuncionarioComponent
  ],
  imports: [
    CommonModule,
    EmailRoutingModule
  ]
})
export class EmailModule { }
