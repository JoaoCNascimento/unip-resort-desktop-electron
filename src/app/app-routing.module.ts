import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FuncionariosModule } from './components/funcionarios/funcionarios/funcionarios.module';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'funcionarios', loadChildren: () => import('./components/funcionarios/funcionarios/funcionarios.module')
      .then(m => m.FuncionariosModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'quartos', loadChildren: () => import('./components/quartos/quartos/quartos.module')
      .then(m => m.QuartosModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'email', loadChildren: () => import('./components/email/module/email.module')
      .then(m => m.EmailModule),
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
