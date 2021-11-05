import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from 'src/app/models/Funcionario';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {

  baseUrl = "https://backend-pim.herokuapp.com/funcionarios";

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Funcionario[]> {
    return this.httpClient.get<Funcionario[]>(this.baseUrl);
  }

  create(f: Funcionario) {
    return this.httpClient.post(this.baseUrl, f);
  }
}
