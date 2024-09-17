import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ProjectServiceService } from 'src/app/services/project-service.service';
import { Projeto } from 'src/app/models/projeto';
import { EnumStatus } from 'src/app/models/enums/enums-status';
import { AtualizarStatus } from 'src/app/models/atualizarStatus';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { RespostaApi } from 'src/app/models/respostaApi';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario';
import { ModalEditarProjetoComponent } from '../modals/modal-editar-projeto/modal-editar-projeto.component';
import { ModalCadastrarProjetoComponent } from '../modals/modal-cadastrar-projeto/modal-cadastrar-projeto.component';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  fazer: Projeto[] = [];
  andamento: Projeto[] = [];
  pausado: Projeto[] = [];
  concluido: Projeto[] = [];

  usuario: Usuario = {
    id : '00000000-0000-0000-0000-000000000000',
    username:"",
    password:"",
    email:"",
    typeUser:0
    };

  projeto: Projeto = {
    id: '00000000-0000-0000-0000-000000000000',
    name: '',
    description: '',
    responsaveis: this.usuario,
    dataCadastro: new Date(),
    dataAtualizacao: undefined,
    dataEntrega: new Date(),
    status: EnumStatus.EmDesenvolvimento,
    empresaId: ""
  };

  constructor(
    private service: ProjectServiceService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public auhtService: AuthService,
    private loadingService: LoadingService
  ) {}

  async ngOnInit() {
    if(await this.auhtService.logado()){
      this.buscarProjetos();
    }else{
      this.loadingService.setLoading(true);
      setTimeout(() => {
        this.buscarProjetos();
      }, 3000);
    }

  }

  drop(event: CdkDragDrop<Projeto[]>) {
    this.loadingService.setLoading(true);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const projeto = event.container.data[event.currentIndex];
      const novoStatus =
        event.container.data === this.fazer
          ? EnumStatus.AFazer
          : event.container.data === this.andamento
          ? EnumStatus.EmDesenvolvimento
          : event.container.data === this.pausado
          ? EnumStatus.Teste
          : event.container.data === this.concluido
          ? EnumStatus.Concluido
          : EnumStatus.AFazer;

      this.atualizaStatus(projeto.id, novoStatus);
    }
  }

  abrirModalCadastro() {
    var modalCadastro = this.dialog.open(ModalCadastrarProjetoComponent, {
      width: '900px',
    });
  }

  atualizaStatus(id: string, status: EnumStatus) {
    var atualizarStatus: AtualizarStatus = {
      id: id,
      status: status,
    };

    this.service
      .atualizarStatus(atualizarStatus)
      .subscribe((resposta: RespostaApi) => {
        this.toastr.success('Status atualizado com sucesso!');
        this.loadingService.setLoading(false);
      });
  }

  detalhesProjeto(projetoId: string) {
    this.service.buscarProjeto(projetoId).subscribe((resposta: RespostaApi) => {
      var projeto: Projeto = resposta.data;
      const dialogRef = this.dialog.open(ModalEditarProjetoComponent, {data: projeto,
        width:'900px'
      });
      dialogRef.afterClosed().subscribe((atualizado)=>{
        if(atualizado){
          location.reload();
        }
      });
    });
  }

  selectedTab: number = 1;

  selectTab(tabNumber: number) {
    this.selectedTab = tabNumber;
  }

  buscarProjetos() {
    this.loadingService.setLoading(true);
    this.service.buscarProjetos().subscribe((resposta: RespostaApi) => {
      resposta.data.forEach((element: Projeto) => {
        switch (element.status) {
          case EnumStatus.AFazer:
            this.fazer.push(element);
            break;
          case EnumStatus.EmDesenvolvimento:
            this.andamento.push(element);
            break;
          case EnumStatus.Teste:
            this.pausado.push(element);
            break;
          case EnumStatus.Concluido:
            this.concluido.push(element);
            break;
        }


      });

      this.loadingService.setLoading(false);
    });
  }


  onCardClick(event: MouseEvent, id: string) {
    if (event.defaultPrevented) {
      return;
    }
    this.detalhesProjeto(id);
  }
}
