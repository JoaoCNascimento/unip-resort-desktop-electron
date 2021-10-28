import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-criar-categoria',
  templateUrl: './criar-categoria.component.html',
  styleUrls: ['./criar-categoria.component.css']
})
export class CriarCategoriaComponent implements OnInit {

  form: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  setImagePreview(e) {
    let file = e[0];

    if (file) {
      const reader = new FileReader();
      const previewImage = document.querySelector('.image-preview-image');

      reader.addEventListener("load", () => {
        previewImage.setAttribute("src", reader.result.toString());
      })

      reader.readAsDataURL(file);
    }

  }

}
