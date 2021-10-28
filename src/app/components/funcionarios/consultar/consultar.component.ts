import { Component, OnInit } from '@angular/core';
import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { Funcionario } from 'src/app/models/Funcionario';
import { FuncionariosService } from 'src/app/services/api/funcionarios.service';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {

  faEye = faEye;
  faEdit = faEdit;

  funcionarios: Funcionario[] = [
    {
      id: 1,
      nome: "João Nascimento",
      cpf: "421.412.412.44",
      rg: "42.421.421-4",
      email: "joao.nascimento@email.com",
      dataNasc: Date.parse("2002-03-24").toString(),
      telefone: "(13) 994854-4244",
      cep: "44442-424",
      rua: "Vila dos camareiros",
      numero: "condomínio casa 1455",
      bairro: "Nova Ema",
      cidade: "Zé Ipiranga",
      estado: "São Petersburgo",
      matricula: "421.421-42",
      cargo: "Administrador",
      ctps: "444.412-5",
      dataAdmissao: new Date(),
      salario: 4000.10
    },
    {
      id: 2,
      nome: "Brayem (com M)",
      cpf: "421.412.412.44",
      rg: "42.421.421-4",
      email: "brayem@email.com",
      dataNasc: Date.parse("2002-03-24").toString(),
      telefone: "(11) 4142-4244",
      cep: "09042-424",
      rua: "Vila dos camareiros",
      numero: "condomínio casa 551",
      bairro: "Nova Orlenas",
      cidade: "Zé Aldemar",
      estado: "São Walmir",
      matricula: "652.414-4",
      cargo: "Recepcionista",
      ctps: "612.412-8",
      dataAdmissao: new Date(),
      salario: 2000.10
    }
  ]

  constructor(private fs: FuncionariosService) { }

  ngOnInit(): void {
    this.findAllFuncionarios();
  }

  findAllFuncionarios() {
    this.fs.findAll().subscribe(res => {
      console.log(res);
    });
  }
}
