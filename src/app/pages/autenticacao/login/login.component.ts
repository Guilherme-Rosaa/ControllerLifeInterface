import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginUsuario } from 'src/app/models/LoginUsuario';
import { NovoUsuario } from 'src/app/models/NovoUsuario';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Route, Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import * as signalR from '@microsoft/signalr';
import { SignalRService } from 'src/app/services/signalr.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  login: string = "Gui";
  senha: string = "teste";

  progresso$: Observable<number>;


  progress: number | null = null;
  private connection: signalR.HubConnection | undefined;

  constructor(
    private service: AuthService,
    private toastr: ToastrService,
    private cookieService: CookieService,
    private router: Router,
    private loadingService: LoadingService,
    private signalService: SignalRService
  ) {
    this.progresso$ = this.buscarProgresso();
  }
  ngOnInit(): void {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44322/progressHub')
      .build();

    this.connection.on('ReceiveProgress', (progress: number) => {
      this.progress = progress;
    });

    this.connection.start().catch(err => console.error(err.toString()));
  }

  loginUsuario: LoginUsuario = {
    userName: this.login,
    password: this.senha
  };


  fazerLogin(): void {
    this.loadingService.setLoading(true);

    this.service.login(this.loginUsuario).subscribe({
      next: async (resposta: any) => {
        if (resposta.isSucceeded) {
          const token = resposta.data;
          const host = window.location.hostname;

          if ('caches' in window) {
            caches.open('token').then(cache => {
              cache.put(host, new Response(token)).then(() => {
                this.service.logedEvent.emit();
              }).catch(error => {
                this.toastr.error('Erro ao armazenar token no cache:', error);
              });
            }).catch(error => {
              this.toastr.error('Erro ao abrir o cache:', error);
            });
          } else {
            this.toastr.error('O navegador não suporta o Cache API');
          }

          this.cookieService.set('token', token, undefined, undefined, undefined, true, 'Strict');
          this.toastr.success("Login realizado com sucesso");

          let usuarioLogado = await this.service.logado();
          if(usuarioLogado){
            this.loadingService.setLoading(false);
            this.router.navigate(['/kanban']);
          }
          else{
            this.toastr.error("Erro ao realizar o login!");
          }

        } else {
          this.toastr.error(resposta.errors[0], "Erro ao realizar o login!");
        }

        this.loadingService.setLoading(false);
      },
      error: (error) => {
        this.toastr.error('Erro ao realizar o login:', error);
        this.loadingService.setLoading(false);
      }
    });
  }

  buscarProgresso(): Observable<number> {
    return this.signalService.getProgress();
  }
}
