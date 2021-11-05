import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Funcionario } from 'src/app/models/Funcionario';
import { FuncionariosService } from 'src/app/services/api/funcionarios.service';
import { CepService } from 'src/app/services/cep.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  form: FormGroup;

  constructor(
    private cepService: CepService,
    private fs: FuncionariosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.configurateForm();
  }

  onSubmit() {
    if(this.form.valid) {
      let funcionario: Funcionario = Object.assign({}, this.form.value);
      this.fs.create(funcionario).subscribe(res => {
        this.router.navigate(['consultar']);
      });
    }
    else {
      alert("Inválido");
    }
  }

  configurateForm() {

    let controlConfig = {
      validators: [
        Validators.required,
      ]
    }

    let controlConfigEmail = new FormControl(null, {
      validators: [
        Validators.required,
        Validators.email
      ],
    })

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
      senha: new FormControl(null, {
        validators: [
          Validators.required
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
}


