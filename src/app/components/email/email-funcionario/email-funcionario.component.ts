import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Funcionario } from 'src/app/models/Funcionario';
import { FuncionariosService } from 'src/app/services/api/funcionarios.service';

@Component({
  selector: 'app-email-funcionario',
  templateUrl: './email-funcionario.component.html',
  styleUrls: ['./email-funcionario.component.css']
})
export class EmailFuncionarioComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fs: FuncionariosService
  ) { }

  ngOnInit(): void {
    this.configurateForm();
  }

  configurateForm() {
    return this.form = new FormGroup({
      assunto: new FormControl(),
      titulo: new FormControl(),
      conteudo: new FormControl(),
      imagem: new FormControl()
    })
  }

  alterarImagem(e: Event) {
    let file = e[0];

    if (file) {
      const reader = new FileReader();
      const previewImage = document.querySelectorAll('.img-container')[0];

      reader.addEventListener("load", () => {
        previewImage.setAttribute("src", reader.result.toString());
        this.form.get('imagem').setValue(reader.result.toString());
      })

      reader.readAsDataURL(file);
    }
  }

  enviarEmail() {
    const emailBody = document.querySelectorAll('.email-body')[0];
    console.log(emailBody.innerHTML);
  }
}
