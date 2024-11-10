import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { FieldService } from '../../services/field.service';
import { catchError, of } from 'rxjs';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-fields',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss'],
})
export class FieldsComponent implements OnInit {
  creationFieldForm = new FormGroup({
    name: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    surface: new FormControl('', Validators.required),
    price_per_hour: new FormControl('', Validators.required),
    is_available: new FormControl('true', Validators.required),
  });

  fieldsList: any[] | any = [];
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fieldService: FieldService) {}

  ngOnInit(): void {
    this.getAllFields();
  }

  createField() {
    if (this.creationFieldForm.valid) {
      this.fieldService.createField(this.creationFieldForm.value).pipe(
        catchError((error) => {
          this.errorMessage = 'Error al crear el campo. Inténtelo de nuevo.';
          return of(null);
        })
      ).subscribe((response) => {
        if (response) {
          this.successMessage = 'Campo creado exitosamente';
          this.creationFieldForm.reset();
          this.getAllFields();
        }
      });
    } else {
      this.errorMessage = 'Por favor complete todos los campos correctamente.';
    }
  }

  getAllFields() {
    this.fieldService.getAllFields().pipe(
      catchError((error) => {
        this.errorMessage = 'Error al cargar los campos. Inténtelo de nuevo.';
        return of([]);
      })
    ).subscribe((fields) => {
      this.fieldsList = fields as [];
    });
  }

  deleteField(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este campo?')) {
      this.fieldService.deleteField(id).pipe(
        catchError((error) => {
          this.errorMessage = 'Error al eliminar el campo. Inténtelo de nuevo.';
          return of([]);
        })
      ).subscribe((updatedFields) => {
        if (updatedFields) {
          this.fieldsList = updatedFields; // Actualizar la tabla con los datos actualizados
          this.successMessage = 'Campo eliminado exitosamente';
        }
      });
    }
  }
}
