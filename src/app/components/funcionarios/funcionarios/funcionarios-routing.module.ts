import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarComponent } from '../cadastrar/cadastrar.component';
import { ConsultarComponent } from '../consultar/consultar.component';
import { FuncionariosComponent } from '../funcionarios.component';


const routes: Routes = [
  {
    path: '', component: FuncionariosComponent, children: [
      {
        path: 'cadastrar', component: CadastrarComponent
      },
      {
        path: 'consultar', component: ConsultarComponent
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionariosRoutingModule { }
