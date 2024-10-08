import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RespostaApi } from './models/respostaApi';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from './services/loading.service';
import { SignalRService } from './services/signalr.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ControllerLifeInterface';
  token: string = "";
  loading = false;
  progresso$: Observable<number>;


  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private loadingService : LoadingService,
    private signalService: SignalRService
  ) {
    this.authService.logedEvent.subscribe(() => {
      this.buscarToken();
    });


    

    this.progresso$ = this.buscarProgresso();
  }

  ngOnInit(): void {
    this.buscarToken();
  }



  buscarToken() {
    this.authService
      .getTokenFromCache()
      .then((token) => {
        if (token) {
          this.token = token;
        } else {
          this.token = "";
        }
      })
      .catch((error) => {
        this.toastr.error('Erro ao buscar token no cache:', error);
      this.token = ""
      });
  }

  logout() {

  }

  buscarProgresso(): Observable<number> {
    return this.signalService.getProgress();
  }
}
