import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Cliente } from "src/app/models/Cliente";
import { ClienteService } from "src/app/services/api/cliente.service";
import { EmailService } from "src/app/services/api/email.service";

@Component({
  selector: "app-email-cliente",
  templateUrl: "./email-cliente.component.html",
  styleUrls: ["./email-cliente.component.css"],
})
export class EmailClienteComponent implements OnInit {
  form: FormGroup;
  img: string;

  enviando = false;

  constructor(
    private es: EmailService,
    private cs: ClienteService,
    private ts: ToastrService
  ) {}

  ngOnInit(): void {
    this.configurateForm();
  }

  configurateForm() {
    return (this.form = new FormGroup({
      assunto: new FormControl(null, { validators: [Validators.required] }),
      titulo: new FormControl(null, { validators: [Validators.required] }),
      conteudo: new FormControl(null, { validators: [Validators.required] }),
      imagem: new FormControl(null, { validators: [Validators.required] }),
    }));
  }

  alterarImagem(e) {
    let file = e[0];

    if (file) {
      const reader = new FileReader();
      const previewImage = document.querySelectorAll(".img-container")[0];

      reader.addEventListener("load", () => {
        previewImage.setAttribute("src", reader.result.toString());
        this.form.get("imagem").setValue(reader.result.toString());
      });

      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return this.ts.warning(
        "Verifique se os campos foram preenchidos corretamente"
      );
    }

    if (this.enviando) {
      return this.ts.info("Já há um envio de email em andamento.");
    }

    let html = document.querySelectorAll(".email-body")[0];

    let email = {
      subject: this.form.get("assunto").value,
      titulo: this.form.get("titulo").value,
      conteudo: this.form.get("conteudo").value,
      img: this.form.get("imagem").value,
    };

    this.enviando = true;

    this.cs.findAll().subscribe((res: Cliente[]) => {
      let emails: String[] = res.map((c: Cliente) => {
        return c.email;
      });

      this.es.sendMail(emails, email).subscribe((res) => {
        this.form.reset();
      });
    });
  }
}
