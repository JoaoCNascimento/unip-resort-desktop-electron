import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Manutencao } from 'src/app/models/Manutencao';

@Component({
  selector: 'app-manutencao',
  templateUrl: './manutencao.component.html',
  styleUrls: ['./manutencao.component.css']
})
export class ManutencaoComponent implements OnInit {

  faEdit = faEdit;
  faTrash = faTrash;

  form: FormGroup;

  manutencoes: Manutencao[] = [
    {
      id: 1,
      descricao: 'Limpeza de piscinas',
      dataInicio: new Date('2021-11-20'),
      dataFim: new Date('2021-11-21'),
      custos: 1230.75
    },
    {
      id: 2,
      descricao: 'Festas e decoração de natal',
      dataInicio: new Date('2021-12-23'),
      dataFim: new Date('2021-12-25'),
      custos: 3000.50
    },
    {
      id: 3,
      descricao: 'Troca de arcondicionados',
      dataInicio: new Date('2022-02-01'),
      dataFim: new Date('2022-02-04'),
      custos: 12000.00
    },
  ]

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.configurateForm();
  }

  configurateForm(id?: Number) {
    if(id) {
      let manutencao: Manutencao = this.manutencoes[this.manutencoes.findIndex(i => i.id == id)];

      this.form = this.fb.group({
        descricao: [manutencao.descricao, []],
        dataInicio: [manutencao.dataInicio, []],
        dataFim: [manutencao.dataFim, []],
        custos: [manutencao.custos, []],
      });

      this.revealModal(1);

      return;
    }

    this.form = this.fb.group({
      descricao: [null, []],
      dataInicio: [null, []],
      dataFim: [null, []],
      custos: [null, []],
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
