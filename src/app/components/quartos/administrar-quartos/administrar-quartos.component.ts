import { Component, OnInit } from "@angular/core";
import { Form, FormControl, FormGroup, Validators } from "@angular/forms";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Categoria } from "src/app/models/Categoria";
import { Quarto } from "src/app/models/Quarto";
import { CategoriaService } from "src/app/services/api/categoria.service";
import { QuartoService } from "src/app/services/api/quartos.service";

@Component({
  selector: "app-administrar-quartos",
  templateUrl: "./administrar-quartos.component.html",
  styleUrls: ["./administrar-quartos.component.css"],
})
export class AdministrarQuartosComponent implements OnInit {
  quarto: Quarto;

  faTrash = faTrash;
  faEdit = faEdit;

  _filtrarQuartos() {
    this.filtrarQuartos(
      this.researchForm.get("andar").value,
      this.researchForm.get("numero").value
    );
  }

  quartosFiltrados: Quarto[] = [];

  quartos: Quarto[] = [];
  categorias: Categoria[] = [];

  form: FormGroup;

  researchForm: FormGroup;

  constructor(private qs: QuartoService, private cs: CategoriaService) {}

  ngOnInit(): void {
    this.configurateForm();
    this.getQuartos();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return alert("Formulário inválido!");
    }

    let quarto = Object.assign({}, this.form.value);

    this.qs.create(quarto).subscribe((res) => {
      this.getQuartos();
      this.hideModal(0);
    });
  }

  onSubmitUpdate() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return alert("Formulário inválido!");
    }

    let quarto = Object.assign({}, this.form.value);

    this.qs.update(quarto).subscribe((res) => {
      this.getQuartos();
      this.hideModal(1);
    });
  }

  getQuartos() {
    this.cs.findAll().subscribe((res) => {
      this.categorias = res;
    });

    this.qs.findAll().subscribe((res) => {
      this.quartos = res;
      this.quartosFiltrados = this.quartos;
    });
  }

  deleteQuarto(id) {
    this.qs.deleteById(id).subscribe((res) => {
      this.getQuartos();
    });
  }

  configurateForm(id?: number) {
    this.quarto = null;
    if (id) {
      let quarto: Quarto;

      this.quartos.map((e) => {
        if (e.id === id) {
          return (quarto = e);
        }
      });

      this.quarto = quarto;

      this.form = new FormGroup({
        id: new FormControl(quarto.id, { validators: [Validators.required] }),
        categoria: new FormControl(quarto.categoria.id, {
          validators: [Validators.required],
        }),
        numero: new FormControl(quarto.numero, {
          validators: [Validators.required],
        }),
        andar: new FormControl(quarto.andar, {
          validators: [Validators.required],
        }),
      });

      this.revealModal(1);
      return;
    }
    this.researchForm = new FormGroup({
      andar: new FormControl(null, {}),
      numero: new FormControl(null, {}),
    });

    return (this.form = new FormGroup({
      id: new FormControl(null),
      categoria: new FormControl('placeholder', { validators: [Validators.required] }),
      numero: new FormControl(null, { validators: [Validators.required] }),
      andar: new FormControl(null, { validators: [Validators.required] }),
    }));
  }

  filtrarQuartos(andar: string, numero: string) {
    if (isNaN(Number(andar))) {
      return;
    }

    andar = andar.toLocaleLowerCase();
    return (this.quartosFiltrados = this.quartos.filter(
      (quarto) =>
        quarto.andar.toString().indexOf(andar) !== -1 &&
        quarto.numero.toString().indexOf(numero) !== -1
    ));
  }

  revealModal(modal_index: number) {
    const modal: any =
      document.querySelectorAll(".modal-container")[modal_index];
    const modalBody: any =
      document.querySelectorAll(".modal-body")[modal_index];

    modal.style.cssText = "display: flex";
    setTimeout(() => {
      modalBody.style.cssText = "margin-top: 0%";
    }, 150);
  }

  hideModal(modal_index: number) {
    const modal: any =
      document.querySelectorAll(".modal-container")[modal_index];
    const modalBody: any =
      document.querySelectorAll(".modal-body")[modal_index];
    setTimeout(() => {
      modalBody.style.cssText = "margin-top: -105%";
    }, 50);
    setTimeout(() => {
      modal.style.cssText = "display: none";
      this.form.reset();
    }, 400);
  }
}
