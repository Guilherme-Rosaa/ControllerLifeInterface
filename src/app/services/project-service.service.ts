import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Projeto } from '../models/projeto';
import { Observable, from, switchMap } from 'rxjs';
import { RespostaApi } from '../models/respostaApi';
import { AtualizarStatus } from '../models/atualizarStatus';

@Injectable({
  providedIn: 'root',
})
export class ProjectServiceService {
  constructor(private http: HttpClient) {}

  buscarProjetos(): Observable<RespostaApi> {
    return from(this.getTokenFromCache()).pipe(
      switchMap((token: string | null) => {
        const headers = this.addHeader(token);

        return this.http.get<RespostaApi>(
         'https://localhost:7184/Projetos/BuscarProjetos',
          { headers }
        );
      })
    );
  }

  buscarProjeto(projetoId: string): Observable<RespostaApi> {
    return from(this.getTokenFromCache()).pipe(
      switchMap((token: string | null) => {
        const headers = this.addHeader(token);

        return this.http.get<RespostaApi>(
         `https://localhost:7184/Projetos/BuscarProjeto?projetoId=${projetoId}`,
          { headers }
        );
      })
    );
  }


  cadastrarProjetos(projeto: Projeto): Observable<RespostaApi> {
    return from(this.getTokenFromCache()).pipe(
      switchMap((token: string | null) => {
        const headers = this.addHeader(token);

        return this.http.post<RespostaApi>(
         'https://localhost:7184/Projetos/CadastrarProjeto',
      projeto,
          { headers }
        );
      })
    );
  }


  atualizarStatus(status: AtualizarStatus): Observable<RespostaApi> {
    return from(this.getTokenFromCache()).pipe(
      switchMap((token: string | null) => {
        const headers = this.addHeader(token);

        return this.http.post<RespostaApi>(
         'https://localhost:7184/Projetos/AtualizarStatus',
          status,
          { headers }
        );
      })
    );
  }

  atualizarProjeto(projeto: Projeto){
    return from(this.getTokenFromCache()).pipe(
      switchMap((token: string | null) => {
        const headers = this.addHeader(token);

        return this.http.put<RespostaApi>(
         'https://localhost:7184/Projetos/AtualizarProjeto',
          projeto,
          { headers }
        );
      })
    );
  }












  public getTokenFromCache(): Promise<string | null> {
    const host = window.location.hostname;
    return caches.open('token').then(cache => {
      return cache.match(host).then(response => {
        if (response) {
          return response.text();
        } else {
          return null;
        }
      });
    }).catch(error => {
      console.error('Erro ao buscar token no cache:', error);
      return null;
    });
  }

  private addHeader(token: string | null): HttpHeaders {
    let defaultHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    if (token) {
      defaultHeaders = defaultHeaders.set('Authorization', `Bearer ${token}`);
    } else {
      console.error('Token não encontrado. Não foi possível adicionar o cabeçalho de autorização.');
    }

    return defaultHeaders;
  }
}
