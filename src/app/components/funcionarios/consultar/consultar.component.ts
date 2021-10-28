import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { Funcionario } from 'src/app/models/Funcionario';
import { FuncionariosService } from 'src/app/services/api/funcionarios.service';
import { CepService } from 'src/app/services/cep.service';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {

  faEye = faEye;
  faEdit = faEdit;

  form: FormGroup;

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
      salario: 7000.00
    },
    {
      id: 2,
      nome: "Braya",
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

  constructor(
    private fs: FuncionariosService
    ,private cepService: CepService
    ) { }

  ngOnInit(): void {
    this.findAllFuncionarios();
    this.configurateForm();
  }

  findAllFuncionarios() {
    this.fs.findAll().subscribe(res => {
      console.log(res);
    });
  }

  configurateForm(id?: number) {
    if (id) {
      let funcionario: Funcionario;
      this.funcionarios.map((e:Funcionario) => {
        if (e.id === id)
        {
          return funcionario = e;
        }
      });
  
      this.form = new FormGroup({
        nome: new FormControl(funcionario.nome, {
          validators: [
            Validators.required,
          ]
        }),
        email: new FormControl(funcionario.email, {
          validators: [
            Validators.required,
          ]
        }),
        cpf: new FormControl(funcionario.cpf, {
          validators: [
            Validators.required,
          ]
        }),
        rg: new FormControl(funcionario.rg, {
          validators: [
            Validators.required,
          ]
        }),
        dataNasc: new FormControl(funcionario.dataNasc, {
          validators: [
            Validators.minLength(10),
            Validators.maxLength(12)
          ]
        }),
        telefone: new FormControl(funcionario.telefone, {
          validators: [
            Validators.required,
          ]
        }),
        cep: new FormControl(funcionario.cep, {
          validators: [
            Validators.required,
          ]
        }),
        rua: new FormControl(funcionario.rua, {
          validators: [
            Validators.required,
          ]
        }),
        bairro: new FormControl(funcionario.bairro, {
          validators: [
            Validators.required,
          ]
        }),
        numero: new FormControl(funcionario.numero, {
          validators: [
            Validators.required,
          ]
        }),
        cidade: new FormControl(funcionario.cidade, {
          validators: [
            Validators.required,
          ]
        }),
        estado: new FormControl(funcionario.estado, {
          validators: [
            Validators.required,
          ]
        }),
        matricula: new FormControl(funcionario.matricula, {
          validators: [
            Validators.required,
          ]
        }),
        ctps: new FormControl(funcionario.ctps, {
          validators: [
            Validators.required,
          ]
        }),
        dataAdmissao: new FormControl(funcionario.dataAdmissao, {
          validators: [
            Validators.required,
          ]
        }),
        cargo: new FormControl(funcionario.cargo, {
          validators: [
            Validators.required,
          ]
        }),
        salario: new FormControl(funcionario.salario, {
          validators: [
            Validators.required,
          ]
        }),
      });
      this.revealModal();
    }
    else {
      return this.form = new FormGroup({
        nome: new FormControl(null, {
          validators: [
            Validators.required,
          ]
        }),
        email: new FormControl(null, {
          validators: [
            Validators.required,
          ]
        }),
        cpf: new FormControl(null, {
          validators: [
            Validators.required,
          ]
        }),
        rg: new FormControl(null, {
          validators: [
            Validators.required,
          ]
        }),
        dataNasc: new FormControl(null, {
          validators: [
            Validators.minLength(10),
            Validators.maxLength(12)
          ]
        }),
        telefone: new FormControl(null, {
          validators: [
            Validators.required,
          ]
        }),
        cep: new FormControl(null, {
          validators: [
            Validators.required,
          ]
        }),
        rua: new FormControl(null, {
          validators: [
            Validators.required,
          ]
        }),
        bairro: new FormControl(null, {
          validators: [
            Validators.required,
          ]
        }),
        numero: new FormControl(null, {
          validators: [
            Validators.required,
          ]
        }),
        cidade: new FormControl(null, {
          validators: [
            Validators.required,
          ]
        }),
        estado: new FormControl(null, {
          validators: [
            Validators.required,
          ]
        }),
        matricula: new FormControl(null, {
          validators: [
            Validators.required,
          ]
        }),
        ctps: new FormControl(null, {
          validators: [
            Validators.required,
          ]
        }),
        dataAdmissao: new FormControl(null, {
          validators: [
            Validators.required,
          ]
        }),
        cargo: new FormControl(null, {
          validators: [
            Validators.required,
          ]
        }),
        salario: new FormControl(null, {
          validators: [
            Validators.required,
          ]
        }),
      })
    }
    
  }

  findCep() {
    this.cepService.get(this.form.get('cep').value).subscribe(res => this.changeAdressValues(res));
  }

  changeAdressValues(obj) {

    console.log(obj);

    if (obj.erro) {
      return alert("Cep não encontrado");
    }

    this.form.get('rua').setValue(obj.logradouro);
    this.form.get('bairro').setValue(obj.bairro);
    this.form.get('cidade').setValue(obj.localidade);
    this.form.get('estado').setValue(obj.uf);
  }

  revealModal() {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');

    modal.style.cssText = "display: flex";
    setTimeout(() => {modalBody.style.cssText = "margin-top: 0%";}, 150);
  }

  hideModal() {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    setTimeout(()=>{modalBody.style.cssText = "margin-top: -105%"}, 50)
    setTimeout(()=>{modal.style.cssText = "display: none"; this.form.reset();}, 400)
  }
}
