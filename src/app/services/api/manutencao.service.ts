import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Manutencao } from 'src/app/models/Manutencao';
import { baseUrl } from 'src/config/config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ManutencaoService {

  baseUrl = baseUrl + 'manutencaos'; 

  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService,
    private authService: AuthService
  ) { }

  findAll(): Observable<any> {
    return this.httpClient.get<any[]>(this.baseUrl).pipe(
      tap(res => {this.successMessage('Manutenções encontrados com êxito!'); return res}),
      catchError(er => {this.handleError(er); return er})
    );
  }
 
  create(m: Manutencao) {
    return this.httpClient.post(this.baseUrl, m).pipe(
      tap(res => {this.successMessage('Manutenção criada com êxito!'); return res}),
      catchError(er => {this.handleError(er); return er})
    );
  }
 
  update(m: Manutencao) {
   return this.httpClient.put(this.baseUrl + '/' + m.id, {

   }).pipe(
     tap(res => {this.successMessage('Manutenção de id:' + m.id + ' atualizado com êxito!'); return res}),
     catchError(er => {this.handleError(er); return er})
   )
  }
 
  deleteById(id) {
    return this.httpClient.delete(this.baseUrl + '/' + id).pipe(
     tap(res => {this.successMessage('Manutenção de id:' + id + " deletado com êxito!"); return res}),
     catchError(er => {this.handleError(er); return er})
    )
  }

  successMessage(message) {
    this.toastrService.success(message, 'Sucesso!');
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
