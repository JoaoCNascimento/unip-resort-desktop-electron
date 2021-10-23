import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FuncionariosModule } from './components/funcionarios/funcionarios/funcionarios.module';

const routes: Routes = [
  {
    path: 'funcionarios', loadChildren: () => import('./components/funcionarios/funcionarios/funcionarios.module')
      .then(m => m.FuncionariosModule)
  },
  {
    path: 'quartos', loadChildren: () => import('./components/quartos/quartos/quartos.module')
      .then(m => m.QuartosModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
