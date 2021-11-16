import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Gerente } from 'src/app/models/Gerente';
import { GerenteService } from 'src/app/services/api/gerente.service';
import { CepService } from 'src/app/services/cep.service';

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
    private gs: GerenteService
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

  onSubmit() {

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
  
      this.form = new FormGroup({
        nome: new FormControl(gerente.id, {
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
        confirmarSenha: new FormControl('Confirme a nova senha', {
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
        dataNasc: new FormControl(gerente.dataNasc, {
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
        dataAdmissao: new FormControl(gerente.dataAdmissao, {
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
      })
    }
    
  }

  findCep() {
    this.cepService.get(this.form.get('cep').value).subscribe(res => this.changeAdressValues(res));
  }

  changeAdressValues(obj) {

    if (obj.erro) {
      return alert("Cep não encontrado");
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
