import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailClienteComponent } from '../email-cliente/email-cliente.component';
import { EmailFuncionarioComponent } from '../email-funcionario/email-funcionario.component';
import { EmailComponent } from '../email.component';


const routes: Routes = [
  {
    path: '',
    component: EmailComponent,
    children: [
      {
        path: 'email-clientes',
        component: EmailClienteComponent
      },
      {
        path: 'email-funcionarios',
        component: EmailFuncionarioComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailRoutingModule { }
