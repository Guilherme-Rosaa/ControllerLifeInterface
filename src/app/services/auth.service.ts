import { EventEmitter, Injectable } from '@angular/core';
import { NovoUsuario } from '../models/NovoUsuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginUsuario } from '../models/LoginUsuario';
import { Observable, from, of } from 'rxjs';
import { Router } from '@angular/router';
import { RespostaApi } from '../models/respostaApi';
import { switchMap, catchError } from 'rxjs/operators';
import { SignalRService } from './signalr.service';
import { EnumTipoUsuario } from '../models/enums/enums-tipo-usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  logedEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private http: HttpClient, private router: Router, private signalRService: SignalRService) {
    //this.signalRService.startConnection();
  }

  register(novoUsuario: NovoUsuario) {
    return this.http.post(
      'https://localhost:7184/Usuarios/Register',
      novoUsuario
    );
  }

  login(login: LoginUsuario): Observable<any> {
    return this.http.post(`https://localhost:44322/Usuarios/Login`, login);


  }

  logout(): Observable<RespostaApi> {
    return from(this.getTokenFromCache()).pipe(
      switchMap((token: string | null) => {
        const headers = this.addHeader(token);

        return this.http.post<RespostaApi>(
          'https://localhost:44322/Usuarios/Logout',
          '',
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

  getProgress(): Observable<number> {
    return this.signalRService.getProgress();
  }

  buscarUsuarios(): Observable<RespostaApi>{
    return from(this.getTokenFromCache()).pipe(
      switchMap((token: string | null) => {
        const headers = this.addHeader(token);

        return this.http.get<RespostaApi>(
          'https://localhost:44322/Usuarios/BuscarUsuarios',
          { headers }
        );
      })
    );
  }


  buscarDadosUsuario(): Observable<RespostaApi>{
    return from(this.getTokenFromCache()).pipe(
      switchMap((token: string | null) => {
        const headers = this.addHeader(token);

        return this.http.get<RespostaApi>(
          'https://localhost:44322/Usuarios/BuscarDadosUsuario',
          { headers }
        );
      })
    );
  }

  async logado(){
    const token = await this.getTokenFromCache();
    if(token){
      return true;
    }
    return false;
  }
}
