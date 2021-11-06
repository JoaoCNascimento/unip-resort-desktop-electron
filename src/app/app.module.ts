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
import { CpfPipe } from './pipes/cpf.pipe';
import { LoaderInterceptor } from './components/loader/loader.interceptor';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent
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
    ToastrModule.forRoot({progressBar: true, closeButton: true, timeOut: 2500})
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
