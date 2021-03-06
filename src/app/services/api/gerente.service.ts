import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Gerente } from 'src/app/models/Gerente';
import { baseUrl } from 'src/config/config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GerenteService {

  baseUrl = baseUrl + "gerentes";

  constructor(
    private toastrService: ToastrService,
    private httpClient: HttpClient,
    private authService: AuthService
  ) { }

  findAll(): Observable<any> {
    return this.httpClient.get<any[]>(this.baseUrl).pipe(
      tap(res => {this.successMessage('Registros encontrados com sucesso!'); return res}),
      catchError(er => {this.handleError(er); return er})
    );
  }

  create(g: Gerente) {
    return this.httpClient.post(this.baseUrl, g).pipe(
      tap(res => this.successMessage('Gerente cadastrado com sucesso!')),
      catchError(er => {this.handleError(er); return er;})
    );
  }

  update(g: Gerente) {
    return this.httpClient.put(this.baseUrl + '/' + g.id, g).pipe(
      tap(res => this.successMessage('Gerente atualizado com sucesso!')),
      catchError(er => {this.handleError(er); return er;})
    );
  }

  delete(id) {
    return this.httpClient.delete(this.baseUrl + '/' + id).pipe(
      tap(res => this.successMessage('Gerente excluído com sucesso!')),
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

    if(er.error.errors) {
      return this.toastrService.error('Erro no campo ' + er.error.errors[0].fieldName + ': ' + er.error.errors[0].message);
    }

    return this.toastrService.error("Verifique sua conexão e tente novamente", "Houve um erro...");
  }
}
