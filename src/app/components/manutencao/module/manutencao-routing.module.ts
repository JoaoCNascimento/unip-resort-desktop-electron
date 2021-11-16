import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManutencaoComponent } from '../manutencao.component';


const routes: Routes = [
  {
    path: '',
    component: ManutencaoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManutencaoRoutingModule { }
