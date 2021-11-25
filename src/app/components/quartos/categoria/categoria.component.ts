import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
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

  img: File = null;
  imgUrlToForm: String = ''; 

  form: FormGroup;

  dataAtual: string;

  categorias: Categoria[] = [];

  constructor(
    private cs: CategoriaService,
    private fb: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.configurateForm();
    this.getCategorias();
  }

  getCategorias() {
    this.cs.findAll().subscribe((res: Categoria[]) => {
      this.categorias = res;
    })
  }

  configurateForm(id?: number) {
    // this.imgUrlToForm = '';
    if (id) {
      let categoria: Categoria = this.categorias.filter(c => c.id === id)[0];

      this.form = this.fb.group({
        id: [categoria.id],
        nome: [categoria.nome],
        descricao: [categoria.descricao],
        precoDiaria: [categoria.precoDiaria],
        imageUrl: [categoria.imageUrl]
      });

      if(categoria.imageUrl)
        this.imgUrlToForm = categoria.imageUrl.toString();
      else
        this.imgUrlToForm = 'assets/img-empty.png';

      this.revealModal(1);
    }
    else {
      this.imgUrlToForm = 'assets/img-empty.png'
      return this.form = this.fb.group({
        nome: ['', Validators.required],
        descricao: ['', Validators.required],
        precoDiaria: ['', Validators.required]
      })
    }
  }

  onSubmit() {
    if (!this.form.valid)
      return this.toastrService.info('Verifique se os campos foram preenchidos corretamente.','Formulário inválido...');

    let categoria: Categoria = Object.assign({}, this.form.value);

    categoria.imageUrl = '';

    this.cs.create(categoria).subscribe(
      (res: any) => {
        let savedId = res.headers.get('Location').split('/')[4];
        this.cs.uploadImage(this.img, savedId).subscribe(
          res => {
            this.dataAtual = new Date().getMilliseconds().toString();
            this.getCategorias(); this.hideModal(0);  
          }
        );
      }
    );
  }

  onSubmitUpdateCategoria() {
    if (!this.form.valid)
      return this.toastrService.warning('','Formulário inválido...');

    let categoria: Categoria = Object.assign({}, this.form.value);
    let categoriaId = categoria.id;
    this.cs.update(categoria).subscribe(
      (res: any) => {
        if(this.img === null) {
          this.getCategorias(); this.hideModal(1);
        }
        else 
          this.cs.uploadImage(this.img, categoriaId).subscribe(
            res => {
              this.dataAtual = new Date().getMilliseconds().toString();
              this.getCategorias();
                this.hideModal(1);   
            }
          );
      }
    );
  }

  setImagePreview(e, modal_index: number) {
    let file = e[0];

    this.img = e[0];

    if (file) {
      const reader = new FileReader();
      const previewImage = document.querySelectorAll('.image-preview-image')[modal_index];

      reader.addEventListener("load", () => {
        previewImage.setAttribute("src", reader.result.toString());
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
    setTimeout(() => {
      const previewImage = document.querySelectorAll('.image-preview-image')[modal_index];
      previewImage.setAttribute("src", '');
    }, 1000);
    const modal: any = document.querySelectorAll('.modal-container')[modal_index];
    const modalBody: any = document.querySelectorAll('.modal-body')[modal_index];
    setTimeout(() => { modalBody.style.cssText = "margin-top: -105%" }, 50)
    setTimeout(() => { modal.style.cssText = "display: none"; this.form.reset(); }, 400)
  }

  deleteCategoria(id) {
    this.cs.deleteById(id).subscribe(res => {
      this.getCategorias();
    });
  }
}
