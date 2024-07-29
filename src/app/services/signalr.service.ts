import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection: signalR.HubConnection | undefined;
  private progressSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  // startConnection() {
  //   this.hubConnection = new signalR.HubConnectionBuilder()
  //     .withUrl('https://localhost:44322/progressHub')
  //     .build();

  //   this.hubConnection
  //     .start()
  //     .then(() => {
  //       console.log('Connection started');
  //       this.addProgressListener();
  //     })
  //     .catch((err) => console.log('Error while starting connection: ' + err));
  // }

  addProgressListener() {
    this.hubConnection?.on('ReceiveProgress', (progress: number) => {
      this.progressSubject.next(progress);
    });
  }

  getProgress(): Observable<number> {
    return this.progressSubject.asObservable();
  }

  getConnectionId(): Promise<string> {
    return this.hubConnection?.invoke('GetConnectionId') ?? Promise.reject('Connection not started');
  }
}
