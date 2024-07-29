import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./pages/autenticacao/autenticacao.module').then(m => m.AutenticacaoModule) },
  { path: 'kanban', loadChildren: () => import('./pages/kanban/kanban.module').then(m => m.KanbanModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
