import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { KanbanLayoutComponent } from './kanban-layout/kanban-layout.component';
import { ModalEditarProjetoComponent } from './modals/modal-editar-projeto/modal-editar-projeto.component';
import { ProfileComponent } from '../autenticacao/profile/profile.component';
import { usuarioLogadoGuard } from 'src/app/guards/usuario-logado.guard';

const routes: Routes = [
  {
    path: '',
    component: KanbanLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: DashboardComponent, canActivate: [usuarioLogadoGuard] },
      { path: 'card/:id', component: ModalEditarProjetoComponent, canActivate: [usuarioLogadoGuard] },
      { path: 'perfil-usuario', component:ProfileComponent, canActivate: [usuarioLogadoGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KanbanRoutingModule { }
