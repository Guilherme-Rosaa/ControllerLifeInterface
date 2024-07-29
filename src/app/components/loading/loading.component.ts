import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { SignalRService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
  progresso$: Observable<number>;
  loading: boolean = false;
  message: string = 'Carregando...';

  constructor(
    private signalService: SignalRService,
    private loadingService: LoadingService
  ) {
    this.progresso$ = this.buscarProgresso();

    this.loadingService.getIsLoading().subscribe((isLoading: boolean) => {
      this.loading = isLoading;
    });
  }

  buscarProgresso(): Observable<number> {
    return this.signalService.getProgress();
  }
}
