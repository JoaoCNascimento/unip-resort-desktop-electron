import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Funcionario } from 'src/app/models/Funcionario';
import { baseUrl } from 'src/config/config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {

  baseUrl = baseUrl + 'funcionarios';

  constructor(
     private httpClient: HttpClient
    ,private authService: AuthService
    ,private toastrService: ToastrService
  ) { }

  findAll(): Observable<any> {
    return this.httpClient.get<any[]>(this.baseUrl).pipe(
      tap(res => {this.successMessage('Registros encontrados com sucesso!'); return res}),
      catchError(er => {this.handleError(er); return er})
    );
  }

  create(f: Funcionario) {
    return this.httpClient.post(this.baseUrl, f).pipe(
      tap(res => this.successMessage('Funcionário cadastrado com sucesso!')),
      catchError(er => {this.handleError(er); return er;})
    );
  }

  update(f: Funcionario) {
    return this.httpClient.put(this.baseUrl, f).pipe(
      tap(res => this.successMessage('Funcionário atualizado com sucesso!')),
      catchError(er => {this.handleError(er); return er;})
    );
  }

  delete(id) {
    return this.httpClient.delete(this.baseUrl + '/' + id).pipe(
      tap(res => this.successMessage('Funcionário excluído com sucesso!')),
      catchError(er => {this.handleError(er); return er;})
    );
  }

  successMessage(message: string) {
    this.toastrService.success(message, 'Sucesso');
  }

  handleError(er:any, error_message?: string) {
    if(error_message) {
      return this.toastrService.error(error_message, "Ocorreu um erro.");
    }

    if(er.error.error === "Forbidden") {
      this.toastrService.warning("Faça o login novamente", "Sessão expirada...", { timeOut: 3000 });
      return this.authService.setToken();
    }

    return this.toastrService.error("Verifique sua conexão e tente novamente", "Houve um erro...");
  }
}
