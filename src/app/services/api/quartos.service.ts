import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Quarto } from 'src/app/models/Quarto';

import { baseUrl } from '../../../config/config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class QuartoService {

  baseUrl = baseUrl + 'quartos';

  constructor(
    private httpClient: HttpClient
   ,private authService: AuthService
   ,private toastrService: ToastrService
 ) { }

 findAll(): Observable<any> {
   return this.httpClient.get<any[]>(this.baseUrl).pipe(
     tap(res => {this.successMessage('Quartos encontrados com êxito!'); return res}),
     catchError(er => {this.handleError(er); return er})
   );
 }

 create(q: Quarto) {
   return this.httpClient.post(this.baseUrl, q).pipe(
     tap(res => {this.successMessage('Quarto criado com êxito!'); return res}),
     catchError(er => {this.handleError(er); return er})
   );
 }

 update(q: Quarto) {
  return this.httpClient.put(this.baseUrl + '/' + q.id, {
    andar: q.andar,
    numero: q.numero,
    categoria: q.categoria
  }).pipe(
    tap(res => {this.successMessage('Quarto de id:' + q.id + ' atualizado com êxito!'); return res}),
    catchError(er => {this.handleError(er); return er})
  )
 }

 deleteById(id) {
   return this.httpClient.delete(this.baseUrl + '/' + id).pipe(
    tap(res => {this.successMessage('Quarto de id:' + id + " deletado com êxito!"); return res}),
    catchError(er => {this.handleError(er); return er})
   )
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
