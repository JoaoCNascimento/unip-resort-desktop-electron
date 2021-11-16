import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Categoria } from 'src/app/models/Categoria';
import { CategoriaService } from 'src/app/services/api/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  faTrash = faTrash;
  faEdit = faEdit;

  img:any;

  form: FormGroup;

  categorias: Categoria[] = [];

  constructor(
    private cs: CategoriaService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.configurateForm();
    this.getCategorias();
  }

  getCategorias() {
    this.cs.findAll().subscribe(res => {
      this.categorias = res;
    })
  }

  configurateForm(id?:number) {
    if (id) {
      let categoria: Categoria = this.categorias.filter(c => c.id = id)[0];

      this.form = this.fb.group({
        nome: [categoria.nome],
        descricao: [categoria.descricao],
        imagem: [categoria.imagem],
        precoDiaria: [categoria.precoDiaria]
      });

      console.log(this.form.value);

      this.revealModal(1);
    }
    else {
      return this.form = this.fb.group({
        nome: [],
        descricao: [],
        imagem: [],
        precoDiaria: []
      })
    }
  }

  // TODO - validação de formulário e tratamento de campos inválidos.
  onSubmit() {
    if(!this.form.valid)
      return alert('Formulário inválido!');

    let categoria: Categoria = Object.assign({}, this.form.value);

    this.cs.create(categoria).subscribe(
      res => { this.getCategorias() }
    );
  }

  setImagePreview(e, modal_index: number) {
    let file = e[0];

    this.img = e[0];
    console.log(this.img);
    
    if (file) {
      const reader = new FileReader();
      const previewImage = document.querySelectorAll('.image-preview-image')[modal_index];

      reader.addEventListener("load", () => {
        previewImage.setAttribute("src", reader.result.toString());
        this.form.get('imagem').setValue(reader.result.toString());
      })

      reader.readAsDataURL(file);
    }

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
