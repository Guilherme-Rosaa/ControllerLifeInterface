import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AutenticacaoModule } from './pages/autenticacao/autenticacao.module';
import { KanbanModule } from './pages/kanban/kanban.module';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    AutenticacaoModule,
    KanbanModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
