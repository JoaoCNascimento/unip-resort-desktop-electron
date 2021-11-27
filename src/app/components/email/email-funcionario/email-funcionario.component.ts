import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Funcionario } from 'src/app/models/Funcionario';
import { ClienteService } from 'src/app/services/api/cliente.service';
import { EmailService } from 'src/app/services/api/email.service';
import { FuncionariosService } from 'src/app/services/api/funcionarios.service';

@Component({
  selector: 'app-email-funcionario',
  templateUrl: './email-funcionario.component.html',
  styleUrls: ['./email-funcionario.component.css']
})
export class EmailFuncionarioComponent implements OnInit {
  form: FormGroup;

  enviando: boolean = false;

  constructor(
    private fs: FuncionariosService,
    private es: EmailService,
    private ts: ToastrService
  ) { }

  ngOnInit(): void {
    this.configurateForm();
  }

  configurateForm() {
    return this.form = new FormGroup({
      assunto: new FormControl(null, {validators: [Validators.required]}),
      titulo: new FormControl(null, {validators: [Validators.required]}),
      conteudo: new FormControl(null, {validators: [Validators.required]}),
      imagem: new FormControl(null, {validators: [Validators.required]})
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

  
  onSubmit() {

    if (this.form.invalid)
    {
      this.form.markAllAsTouched();

      return this.ts.warning(
        "Verifique se os campos foram preenchidos corretamente"
      );
    }

    if(this.enviando)
      {
        return this.ts.info('Já há um envio de email em andamento.');
      }

    let email = { 
      subject: this.form.get('assunto').value,
      titulo: this.form.get('titulo').value,
      conteudo: this.form.get('conteudo').value,
      img: this.form.get('imagem').value
    }

    this.enviando = true;

    this.fs.findAll().subscribe((res: Funcionario[]) => {
      let emails: String[] = res.map((f: Funcionario) => {
        return f.email;
      })

      this.es.sendMail(emails, email).subscribe(res => {
        this.enviando = false;
        this.form.reset();
      });
    })
  }
}
