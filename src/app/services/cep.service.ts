import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  private readonly baseUrl = `https://viacep.com.br/ws/`;

  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService
  ) { }

  get(cep: string): Observable<any> {
    return this.httpClient.get<any>(this.baseUrl + cep + '/json').pipe(
      tap(),
      catchError(er => {this.handleErrors(er); return er})
    );
  }

  handleErrors(er) {
    if(er.erro)
      this.toastrService.warning(er.erro);

    if(er.status === 0)
      this.toastrService.warning('Cep inválido.')
  }
}
