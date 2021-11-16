import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguracoesComponent } from '../configuracoes.component';
import { UsuariosComponent } from '../usuarios/usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracoesComponent,
    children: [
      {
        path: 'usuarios',
        component: UsuariosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracoesRoutingModule { }
