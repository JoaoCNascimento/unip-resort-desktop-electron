import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FuncionariosModule } from './components/funcionarios/funcionarios/funcionarios.module';
import { LoaderModule } from './components/loader/loader.module';

import { QuartosModule } from './components/quartos/quartos/quartos.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmailModule } from './components/email/module/email.module';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoaderInterceptor } from './components/loader/loader.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { ManutencaoModule } from './components/manutencao/module/manutencao.module';
import { RelatorioComponent } from './components/relatorio/relatorio.component';
import { ConfiguracoesComponent } from './components/configuracoes/configuracoes.component';
import { ConfiguracoesModule } from './components/configuracoes/module/configuracoes.module';
import { UsuariosComponent } from './components/configuracoes/usuarios/usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RelatorioComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FuncionariosModule,
    QuartosModule,
    LoaderModule,
    EmailModule,
    ToastrModule.forRoot({progressBar: true, closeButton: true, timeOut: 2500}),
    ManutencaoModule,
    ConfiguracoesModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor, 
      multi: true
    }, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ]
})
export class AppModule { }
