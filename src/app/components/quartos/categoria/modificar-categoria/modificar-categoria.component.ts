import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modificar-categoria',
  templateUrl: './modificar-categoria.component.html',
  styleUrls: ['./modificar-categoria.component.css']
})
export class ModificarCategoriaComponent implements OnInit {

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
