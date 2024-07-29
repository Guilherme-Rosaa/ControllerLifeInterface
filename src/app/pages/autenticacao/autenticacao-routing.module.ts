import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastroEmpresaComponent } from './cadastro-empresa/cadastro-empresa.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'cadastro-empresa', component: CadastroEmpresaComponent},
  //{ path: 'perfil-usuario', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutenticacaoRoutingModule { }
