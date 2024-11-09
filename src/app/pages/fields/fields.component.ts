import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {FieldService} from "../../services/field.service";

@Component({
  selector: 'app-fields',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './fields.component.html',
  styleUrl: './fields.component.scss'
})
export class FieldsComponent {
  creationFieldForm = new FormGroup({
    name: new FormControl('') ,
    location: new FormControl('') ,
    surface: new FormControl('') ,
    price_per_hour: new FormControl('') ,
    is_available: new FormControl('true') ,
  })

  constructor(private fieldService: FieldService) {
  }

  createField(){
    this.fieldService.createField(this.creationFieldForm.value)
  }
}
