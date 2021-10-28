import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaComponent } from '../categoria/categoria.component';
import { CriarCategoriaComponent } from '../categoria/criar-categoria/criar-categoria.component';
import { ModificarCategoriaComponent } from '../categoria/modificar-categoria/modificar-categoria.component';
import { QuartosComponent } from '../quartos.component';

const routes: Routes = [
  {
    path: '', component: QuartosComponent, children: [
      {
        path: 'categorias', component: CategoriaComponent, children: [
          { path: 'criar-categoria', component: CriarCategoriaComponent },
          { path: 'modificar-categoria', component: ModificarCategoriaComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuartosRoutingModule { }
