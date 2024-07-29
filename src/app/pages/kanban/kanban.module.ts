import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanRoutingModule } from './kanban-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ModalCadastrarProjetoComponent } from './modals/modal-cadastrar-projeto/modal-cadastrar-projeto.component';
import { ModalEditarProjetoComponent } from './modals/modal-editar-projeto/modal-editar-projeto.component';
import { KanbanLayoutComponent } from './kanban-layout/kanban-layout.component';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { ProfileComponent } from '../autenticacao/profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DashboardComponent,
    ModalCadastrarProjetoComponent,
    ModalEditarProjetoComponent,
    KanbanLayoutComponent,
    MenuComponent,
    SidebarComponent,
    //LoadingComponent
    ProfileComponent
  ],
  imports: [
    CommonModule,
    KanbanRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    SharedModule
  ]
})
export class KanbanModule { }
