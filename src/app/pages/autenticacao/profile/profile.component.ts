import { Component, OnInit } from '@angular/core';
import { RespostaApi } from 'src/app/models/respostaApi';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  usuario: any;

  constructor(
    private authService: AuthService
  ){

  }
  ngOnInit(): void {
    this.authService.buscarDadosUsuario().subscribe((resposta:any) =>{
      if(resposta.isSucceeded){
        this.usuario = resposta.data;
      }
    })

  }


}
