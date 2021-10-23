import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastrarComponent } from '../cadastrar/cadastrar.component';
import { CargosComponent } from '../cargos/cargos.component';
import { ConsultarComponent } from '../consultar/consultar.component';
import { EditarComponent } from '../editar/editar.component';
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
      {
        path: 'editar', component: EditarComponent
      },
      {
        path: 'cargos', component: CargosComponent
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionariosRoutingModule { }
