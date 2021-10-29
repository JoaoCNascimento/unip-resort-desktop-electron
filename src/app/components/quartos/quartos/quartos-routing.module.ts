import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrarQuartosComponent } from '../administrar-quartos/administrar-quartos.component';
import { CategoriaComponent } from '../categoria/categoria.component';
import { QuartosComponent } from '../quartos.component';

const routes: Routes = [
  {
    path: '', component: QuartosComponent, children: [
      {
        path: 'categorias', component: CategoriaComponent
      }, 
      {
        path: 'administrar', component: AdministrarQuartosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuartosRoutingModule { }
