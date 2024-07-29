import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { SignalRService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-kanban-layout',
  templateUrl: './kanban-layout.component.html',
  styleUrls: ['./kanban-layout.component.scss']
})
export class KanbanLayoutComponent {
  sidebarOpen = false;
  routerOutletWidth = '85vw';
  loading = false;
  token: string = '';
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


    this.loadingService.loading.subscribe((isLoading: boolean) => {
      this.loading = isLoading;
    });

    this.progresso$ = this.buscarProgresso();
  }

  ngOnInit(): void {
    this.buscarToken();
  }



  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    this.routerOutletWidth = this.sidebarOpen ? '100vw' : '85vw';
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
