import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpresaDto } from '../models/empresaDto';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private apiUrl = 'https://localhost:44322/Empresa/CadastrarEmpresa';

  constructor(private http: HttpClient) { }

  cadastrarEmpresa(empresaDto: EmpresaDto): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, empresaDto, { headers });
  }
}
