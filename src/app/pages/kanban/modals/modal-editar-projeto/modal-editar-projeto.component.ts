import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, map, of } from 'rxjs';
import { EnumStatus } from 'src/app/models/enums/enums-status';
import { Projeto } from 'src/app/models/projeto';
import { RespostaApi } from 'src/app/models/respostaApi';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ProjectServiceService } from 'src/app/services/project-service.service';

@Component({
  selector: 'app-modal-editar-projeto',
  templateUrl: './modal-editar-projeto.component.html',
  styleUrls: ['./modal-editar-projeto.component.scss']
})
export class ModalEditarProjetoComponent implements OnInit {

  EnumStatus: any;

  usuarios: Usuario[] = [];

  projetoForm: FormGroup;

  statusOptions = [
    { value: EnumStatus.AFazer, label: 'A Fazer' },
    { value: EnumStatus.EmDesenvolvimento, label: 'Em Desenvolvimento' },
    { value: EnumStatus.Teste, label: 'Teste' },
    { value: EnumStatus.Concluido, label: 'Concluído' }
  ];

  constructor(
    public dialogRef: MatDialogRef<ModalEditarProjetoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Projeto,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public authService: AuthService,
    public projetctService: ProjectServiceService,
    private toastr: ToastrService,
    private loadingService: LoadingService
  ) {
    this.projetoForm = this.fb.group({
      name: [data.name, Validators.required],
      description: [data.description, Validators.required],
      responsaveis: ["", Validators.required],
      dataEntrega: [this.formatDate(data.dataEntrega.toString()), Validators.required],
      status: [data.status, Validators.required],
    });
    this.projetoForm.get('responsaveis')?.setValue(this.data.responsaveis);
  }
  ngOnInit(): void {
    this.buscarUsuarios();
  }

  formatDate(date: string): string {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  fecharModal() {
    this.dialogRef.close(false);
  }

  atualizarProjeto() {
    this.loadingService.setLoading(true);

    let projeto : Projeto ={
      id: this.data.id,
      name: this.projetoForm.get('name')?.value,
      description: this.projetoForm.get('description')?.value,
      responsaveis: this.projetoForm.get('responsaveis')?.value,
      dataCadastro: this.data.dataCadastro,
      dataAtualizacao: this.data.dataAtualizacao,
      dataEntrega: this.projetoForm.get('dataEntrega')?.value,
      status:this.projetoForm.get('status')?.value,
      empresaId: this.data.empresaId
    }

    this.projetctService.atualizarProjeto(projeto).pipe(
      map((resposta: RespostaApi) => resposta),
      catchError((erro) => {
        this.toastr.error('Erro ao atualizar o projeto. Tente novamente mais tarde.');
        return of(null);
      }),
      finalize(() => {
        this.dialogRef.close(true);
      })
    ).subscribe((resposta: RespostaApi | null) => {
      if (resposta && resposta.success) {
        this.toastr.success('Projeto atualizado com sucesso!');
      } else if (resposta === null) {
        console.error('Nenhuma resposta recebida do servidor.');
      } else {
        this.toastr.error('Falha na atualização do projeto.');
      }
    });
  }

  buscarUsuarios(){
    this.authService.buscarUsuarios().subscribe((respota: RespostaApi) => {
      this.usuarios = respota.data;
      this.projetoForm.patchValue({
        responsaveis: this.data.responsaveis ? this.usuarios.find(u => u.id === this.data.responsaveis.id) : ''
      });
    })
  }

  compareUsuarios(u1: Usuario, u2: Usuario): boolean {
    return u1 && u2 ? u1.id === u2.id : u1 === u2;
  }
}
