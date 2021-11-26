import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { catchError, tap } from "rxjs/operators";
import { baseUrl } from "src/config/config";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class CepService {
  private readonly baseUrl = baseUrl + "gerentes/send/";

  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService,
    private authService: AuthService
  ) {}

  sendClientes() {
    this.httpClient.get(this.baseUrl + 'clientes').pipe(
        tap(res => this.toastrService.success('Email para clientes enviado com sucesso!')),
        catchError(er => {this.handleErrors(er); return er;})
    );
  }

  sendFuncionarios() {
    this.httpClient.get(this.baseUrl + 'funcionarios').pipe(
        tap(res => this.toastrService.success('Email para funcionarios enviado com sucesso!')),
        catchError(er => {this.handleErrors(er); return er;})
    );
  }

  handleErrors(er) {
    if (er.error.error === "Forbidden") {
      this.toastrService.warning(
        "Faça o login novamente",
        "Sessão expirada...",
        { timeOut: 3000 }
      );
      return this.authService.setToken();
    }

    if (er.error.errors) {
      return this.toastrService.error(
        "Erro no campo " +
          er.error.errors[0].fieldName +
          ": " +
          er.error.errors[0].message
      );
    }

    return this.toastrService.error(
      "Verifique sua conexão e tente novamente",
      "Houve um erro..."
    );
  }
}
