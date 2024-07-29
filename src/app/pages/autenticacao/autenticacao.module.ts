import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutenticacaoRoutingModule } from './autenticacao-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CadastroEmpresaComponent } from './cadastro-empresa/cadastro-empresa.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { CadastroUsuarioEmpresaComponent } from './cadastro-usuario-empresa/cadastro-usuario-empresa.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    LoginComponent,
    CadastroEmpresaComponent,
    CadastroUsuarioComponent,
    CadastroUsuarioEmpresaComponent,
    //ProfileComponent,
  ],
  imports: [
    CommonModule,
    AutenticacaoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AutenticacaoModule { }
