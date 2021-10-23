import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaComponent } from '../categoria/categoria.component';
import { QuartosComponent } from '../quartos.component';

const routes: Routes = [
  {
    path: '', component: QuartosComponent, children: [
      {
        path: 'categorias', component: CategoriaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuartosRoutingModule { }
