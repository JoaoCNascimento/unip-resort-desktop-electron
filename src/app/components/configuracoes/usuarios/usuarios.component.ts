import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Gerente } from 'src/app/models/Gerente';
import { GerenteService } from 'src/app/services/api/gerente.service';
import { CepService } from 'src/app/services/cep.service';

import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  faEdit = faEdit;
  faTrash = faTrash;

  form: FormGroup;

  gerentes: Gerente[] = [];

  constructor(
    private cepService: CepService,
    private gs: GerenteService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.configurateForm();
    this.findAllGerentes();
  }

  findAllGerentes() {
    this.gs.findAll().subscribe((res) => {
      if(res)
        return this.gerentes = res;
      
        return this.gerentes = [];
    });
  }

  deleteGerente(id) {
    this.gs.delete(id).subscribe(res => {
      this.findAllGerentes();
    })
  }

  onSubmit() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return this.toastrService.warning('Verifique se os campos foram preenchidos corretamente.', 'Formulário inválido!');
    }
      
    let gerente: Gerente = Object.assign({}, this.form.value);

    gerente.dataAdmissao = moment(gerente.dataAdmissao.toString()).format('D/mm/yyyy');

    this.gs.create(gerente).subscribe(res => {
      this.findAllGerentes();
      this.hideModal(0);
    });
  }

  onSubmitUpdate() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return this.toastrService.warning('Verifique se os campos foram preenchidos corretamente.', 'Formulário inválido!');
    }

    if(this.form.get('senha').value === 'Digite uma nova senha')
      return this.toastrService.warning('Digite uma nova senha ou repita a antiga para prosseguir', 'Erro no campo senha');
      
    let gerente: Gerente = Object.assign({}, this.form.value);

    gerente.dataAdmissao = moment(gerente.dataAdmissao.toString()).format('DD/MM/yyyy');

    this.gs.update(gerente).subscribe(res => {
      this.findAllGerentes();
      this.hideModal(1);
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
      let gerente: Gerente;
      this.gerentes.map((e:Gerente) => {
        if (e.id === id)
        {
          return gerente = e;
        }
      });
  
      let newDataNasc = gerente.dataNasc.split('/').reverse().join('-');
      let newDataAdmissao = gerente.dataAdmissao.toString().split('/').reverse().join('-');

      this.form = new FormGroup({
        id: new FormControl(gerente.id),

        nome: new FormControl(gerente.nome, {
          validators: [
            Validators.required,
          ]
        }),
        email: new FormControl(gerente.email, {
          validators: [
            Validators.required,
          ]
        }),
        senha: new FormControl('Digite uma nova senha', {
          validators: [
            Validators.required
          ]
        }),
        cpf: new FormControl(gerente.cpf, {
          validators: [
            Validators.required,
          ]
        }),
        rg: new FormControl(gerente.rg, {
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
        telefone: new FormControl(gerente.telefone, {
          validators: [
            Validators.required,
          ]
        }),
        cep: new FormControl(gerente.cep, {
          validators: [
            Validators.required,
          ]
        }),
        rua: new FormControl(gerente.rua, {
          validators: [
            Validators.required,
          ]
        }),
        bairro: new FormControl(gerente.bairro, {
          validators: [
            Validators.required,
          ]
        }),
        numero: new FormControl(gerente.numero, {
          validators: [
            Validators.required,
          ]
        }),
        cidade: new FormControl(gerente.cidade, {
          validators: [
            Validators.required,
          ]
        }),
        estado: new FormControl(gerente.estado, {
          validators: [
            Validators.required,
          ]
        }),
        matricula: new FormControl(gerente.matricula, {
          validators: [
            Validators.required,
          ]
        }),
        ctps: new FormControl(gerente.ctps, {
          validators: [
            Validators.required,
          ]
        }),
        dataAdmissao: new FormControl(newDataAdmissao, {
          validators: [
            Validators.required,
          ]
        }),
        cargo: new FormControl(gerente.cargo, {
          validators: [
            Validators.required,
          ]
        }),
        salario: new FormControl(gerente.salario, {
          validators: [
            Validators.required,
          ]
        }),
        bonificacao: new FormControl(gerente.bonificacao, {
          validators: [
            Validators.required,
          ]
        }),
      });
      this.revealModal(1);
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
        bonificacao: new FormControl(null, {
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

    if (obj.erro) {
      return this.toastrService.warning("Cep não encontrado");
    }

    this.form.get('rua').setValue(obj.logradouro);
    this.form.get('bairro').setValue(obj.bairro);
    this.form.get('cidade').setValue(obj.localidade);
    this.form.get('estado').setValue(obj.uf);
  }

  revealModal(modal_index: number) {
    const modal: any = document.querySelectorAll('.modal-container')[modal_index];
    const modalBody: any = document.querySelectorAll('.modal-body')[modal_index];

    modal.style.cssText = "display: flex";
    setTimeout(() => { modalBody.style.cssText = "margin-top: 0%"; }, 150);
  }

  hideModal(modal_index: number) {
    const modal: any = document.querySelectorAll('.modal-container')[modal_index];
    const modalBody: any = document.querySelectorAll('.modal-body')[modal_index];
    setTimeout(()=>{ modalBody.style.cssText = "margin-top: -105%" }, 50)
    setTimeout(()=>{ modal.style.cssText = "display: none"; this.form.reset(); }, 400)
  }

}
