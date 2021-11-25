import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Funcionario } from 'src/app/models/Funcionario';
import { FuncionariosService } from 'src/app/services/api/funcionarios.service';
import { CepService } from 'src/app/services/cep.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {

  faEdit = faEdit;
  faTrash = faTrash;

  form: FormGroup;

  funcionarios: Funcionario[] = [];

  constructor(
    private fs: FuncionariosService
    , private cepService: CepService
    , private toastrService: ToastrService
  ) { }

  onSubmit() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return this.toastrService.warning('Verifique se todos os campos foram preenchidos corretamente.','Formulário inválido...');
    }

    if(this.form.get('senha').value === 'Digite uma nova senha')
      return this.toastrService.warning('Para salvar as alterações digite a senha antiga do funcionário ou insira uma nova','',{timeOut: 5000});

    let funcionario :Funcionario= Object.assign({}, this.form.value);
    funcionario.dataAdmissao = moment(funcionario.dataAdmissao.toString()).format('D/MM/yyyy');
    this.fs.update(funcionario).subscribe(res => {
      this.findAllFuncionarios();
      this.hideModal();
    })
  }

  ngOnInit(): void {
    this.findAllFuncionarios();
    this.configurateForm();
  }

  deleteFuncionario(id) {
    this.fs.delete(id).subscribe(res =>
      this.findAllFuncionarios()
    );
  }

  findAllFuncionarios() {
    this.fs.findAll().subscribe((res: Funcionario[]) => {
      if (res) {

        let resFiltered = res.map((e:any) => {
          if(!(e.perfis.length === 1))
            return undefined;

          e.cpf = e.cpf.replace(',', "").replace(".", "").replace('-', "").replace(".", "").replace(".", "");
          e.rg = e.rg.replace(',', "").replace(".", "").replace('-', "").replace(".", "").replace(".", "")
          return e;
        });

        resFiltered = resFiltered.filter(e => {return e !== undefined});
        
        return this.funcionarios = resFiltered;
      }
        
      return this.funcionarios = [];
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

  configurateForm(id?: number) {
    if (id) {
      let funcionario: Funcionario;
      this.funcionarios.map((e: Funcionario) => {
        if (e.id === id) {
          return funcionario = e;
        }
      });

      let newDataNasc = funcionario.dataNasc.split('/').reverse().join('-');
      let newDataAdmissao = funcionario.dataAdmissao.toString().split('/').reverse().join('-');

      this.form = new FormGroup({
        id: new FormControl(funcionario.id),
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
        senha: new FormControl('Digite uma nova senha', {
          validators: [
            Validators.required
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
        dataNasc: new FormControl(newDataNasc, {
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
        dataAdmissao: new FormControl(newDataAdmissao, {
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

  }

  findCep() {
    this.cepService.get(this.form.get('cep').value).subscribe(res => this.changeAdressValues(res));
  }

  changeAdressValues(obj) {

    console.log(obj);

    if (obj.erro) {
      return this.toastrService.warning("Cep não encontrado");
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
    setTimeout(() => { modalBody.style.cssText = "margin-top: 0%"; }, 150);
  }

  hideModal() {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    setTimeout(() => { modalBody.style.cssText = "margin-top: -105%" }, 50)
    setTimeout(() => { modal.style.cssText = "display: none"; this.form.reset(); }, 400)
  }
}
