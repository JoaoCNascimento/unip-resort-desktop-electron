import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
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
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.configurateForm();
  }

  onSubmit() {
    if (!this.form.valid)
    {
      this.form.markAllAsTouched();
      return this.toastrService.warning('Verifique se os campos foram preenchidos corretamente.', 'Formulário inválido...');
    }

    let funcionario: Funcionario = Object.assign({}, this.form.value);
    
    funcionario.dataAdmissao = moment(funcionario.dataAdmissao.toString()).format('DD/MM/yyyy');

    this.fs.create(funcionario).subscribe(res => {
      this.router.navigate(['funcionarios/consultar'], {relativeTo: this.route.root});
    });
  }

  geraStringAleatoria() {
    let tamanho = 7;
    var stringAleatoria = '';
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < tamanho; i++) {
        stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    this.form.get('matricula').setValue(stringAleatoria.toUpperCase());
    this.toastrService.info('Matrícula gerada com sucesso!');
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

    if (obj.erro) {
      return this.toastrService.warning("Cep não encontrado");
    }

    this.form.get('rua').setValue(obj.logradouro);
    this.form.get('bairro').setValue(obj.bairro);
    this.form.get('cidade').setValue(obj.localidade);
    this.form.get('estado').setValue(obj.uf);
  }
}


