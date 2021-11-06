import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-email-cliente',
  templateUrl: './email-cliente.component.html',
  styleUrls: ['./email-cliente.component.css']
})
export class EmailClienteComponent implements OnInit {

  form: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.configurateForm();
  }

  configurateForm() {
    return this.form = new FormGroup({
      titulo: new FormControl(),
      conteudo: new FormControl(),
      picture: new FormControl()
    })
  }

  alterarImagem(e) {
    let file = e[0];

    if (file) {
      const reader = new FileReader();
      const previewImage = document.querySelectorAll('.img-container')[0];

      reader.addEventListener("load", () => {
        previewImage.setAttribute("src", reader.result.toString());
      })

      reader.readAsDataURL(file);
    }
  }
}
