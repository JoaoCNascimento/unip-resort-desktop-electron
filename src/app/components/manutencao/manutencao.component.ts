import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Manutencao } from 'src/app/models/Manutencao';
import { ManutencaoService } from 'src/app/services/api/manutencao.service';

@Component({
  selector: 'app-manutencao',
  templateUrl: './manutencao.component.html',
  styleUrls: ['./manutencao.component.css']
})
export class ManutencaoComponent implements OnInit {

  faEdit = faEdit;
  faTrash = faTrash;

  form: FormGroup;

  manutencoes: Manutencao[] = []

  constructor(
    private fb: FormBuilder,
    private ms: ManutencaoService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.configurateForm();
    this.getManutencoes();
  }

  getManutencoes() {
    this.ms.findAll().subscribe((res: Manutencao[]) => {
      this.manutencoes = res;
    })
  }

  onSubmit() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return this.toastrService.warning('Verifique se os campos foram preenchidos corretamente.', 'Formulário inválido...');
    }

    let manutencao: Manutencao = Object.assign({}, this.form.value);

    manutencao.dataInicio = moment(manutencao.dataInicio).format('DD/MM/yyyy HH:mm:ss');
    manutencao.dataFim = moment(manutencao.dataFim).format('DD/MM/yyyy HH:mm:ss');

    this.ms.create(manutencao).subscribe(res => {
      this.getManutencoes();
      this.hideModal(0);
    })
  }

  onSubmitUpdate() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return this.toastrService.warning('Verifique se os campos foram preenchidos corretamente.', 'Formulário inválido...');
    }

    let manutencao: Manutencao = Object.assign({}, this.form.value);

    manutencao.dataInicio = moment(manutencao.dataInicio).format('DD/MM/yyyy HH:mm:ss');
    manutencao.dataFim = moment(manutencao.dataFim).format('DD/MM/yyyy HH:mm:ss');

    this.ms.update(manutencao).subscribe(res => {
      this.getManutencoes();
      this.hideModal(1);
    })
  }

  deleteManutencao(id) {
    this.ms.deleteById(id).subscribe(res => {
      this.getManutencoes();
    })
  }

  configurateForm(id?: Number) {
    if(id) {
      let manutencao: Manutencao = this.manutencoes[this.manutencoes.findIndex(i => i.id == id)];

      let newDateInicio: any = manutencao.dataInicio.toString().split(' ');
      newDateInicio = newDateInicio[0].split('/').reverse().join('-') + ' ' + newDateInicio[1];
      let newDateFim: any = manutencao.dataFim.toString().split(' ');
      newDateFim = newDateFim[0].split('/').reverse().join('-') + ' ' + newDateFim[1];

      this.form = this.fb.group({
        id: [manutencao.id],
        descricao: [manutencao.descricao, [Validators.minLength(5), Validators.required]],
        dataInicio: [newDateInicio, [Validators.minLength(15), Validators.required]],
        dataFim: [newDateFim, [Validators.minLength(15), Validators.required]],
        custos: [manutencao.custos, [Validators.required]],
      });

      this.revealModal(1);

      return;
    }

    this.form = this.fb.group({
      descricao: [null, [Validators.minLength(5),Validators.required]],
      dataInicio: [null, [Validators.minLength(15),Validators.required]],
      dataFim: [null, [Validators.minLength(15),Validators.required]],
      custos: [null, [Validators.required]],
    });
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
