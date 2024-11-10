import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root',
})
export class FieldService {

  private apiUrl = environment['AG_URL'] || 'http://localhost';

  constructor(private http: HttpClient) {
    console.log(environment)
  }

  createField(data: any) {
    const url = `${this.apiUrl}/field`;
    return this.http.post(url, data);
  }

  getAllFields() {
    const url = `${this.apiUrl}/field`;
    return this.http.get(url);
  }

  deleteField(id: number) {
    const url = `${this.apiUrl}/field/${id}`;
    return this.http.delete(url);
  }
}
