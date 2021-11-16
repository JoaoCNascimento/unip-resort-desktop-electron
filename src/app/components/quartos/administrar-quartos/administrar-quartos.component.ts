import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Categoria } from 'src/app/models/Categoria';
import { Quarto } from 'src/app/models/Quarto';
import { QuartoService } from 'src/app/services/api/quartos.service';

@Component({
  selector: 'app-administrar-quartos',
  templateUrl: './administrar-quartos.component.html',
  styleUrls: ['./administrar-quartos.component.css']
})
export class AdministrarQuartosComponent implements OnInit {

  faTrash = faTrash;
  faEdit = faEdit;

  _filtrarQuartos() {
    this.filtrarQuartos(this.researchForm.get('andar').value, this.researchForm.get('numero').value);
  }

  quartosFiltrados: Quarto[] = [];

  quartos: Quarto[] = [];

  form: FormGroup;

  researchForm: FormGroup;

  constructor(
    private qs: QuartoService
  ) { }

  ngOnInit(): void {
    this.configurateForm();
    this.getQuartos();
  }

  getQuartos() {
    this.qs.findAll().subscribe(res => {
      this.quartos = res;
      this.quartosFiltrados = this.quartos;
    });
  }

  configurateForm(id?:number) {
    if (id) {
      let quarto: Quarto;

      this.quartos.map(e => {
        if(e.id === id) {
          return quarto = e;
        }
      })

      this.form = new FormGroup({
        id: new FormControl(quarto.id, {validators: [Validators.required]}),
        categoria: new FormControl(quarto.categoria.nome, {}),
        numero: new FormControl(quarto.numero, {}),
        andar: new FormControl(quarto.id,{})
      })

      this.revealModal(1);
    }
    else {
      
      this.researchForm = new FormGroup({
        andar: new FormControl(null, {}),
        numero: new FormControl(null, {}),
      });

      return this.form = new FormGroup({
        id: new FormControl(null, {}),
        categoria: new FormControl(null, {}),
        numero: new FormControl(null, {}),
        andar: new FormControl(null, {})
      })
    }
  }

  filtrarQuartos(andar: string, numero: string) {
    if(isNaN(Number(andar))){
      return;
    }

    andar = andar.toLocaleLowerCase();
    return this.quartosFiltrados = this.quartos.filter(quarto => 
      quarto.andar.toString().indexOf(andar) !== -1 && quarto.numero.toString().indexOf(numero) !== -1);
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

