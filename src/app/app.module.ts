import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FuncionariosModule } from './components/funcionarios/funcionarios/funcionarios.module';
import { LoaderModule } from './components/loader/loader.module';

import { QuartosModule } from './components/quartos/quartos/quartos.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdministrarQuartosComponent } from './components/quartos/administrar-quartos/administrar-quartos.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AdministrarQuartosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FuncionariosModule,
    QuartosModule,
    LoaderModule
  ],
  bootstrap: [AppComponent],
  providers: [

  ]
})
export class AppModule { }
