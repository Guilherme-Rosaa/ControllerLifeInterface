import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LoadingComponent } from '../components/loading/loading.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoading = new BehaviorSubject<boolean>(false);
  loading: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  setLoading(load: boolean): void {
    this.isLoading.next(load);
    this.loading.emit(load);
  }

  getIsLoading(): BehaviorSubject<boolean> {
    return this.isLoading;
  }
}
