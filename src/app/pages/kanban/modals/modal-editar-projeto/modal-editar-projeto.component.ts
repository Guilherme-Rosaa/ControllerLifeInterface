import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EnumStatus } from 'src/app/models/enums/enums-status';
import { Projeto } from 'src/app/models/projeto';
import { RespostaApi } from 'src/app/models/respostaApi';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
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
    @Inject(MAT_DIALOG_DATA) public data: Projeto,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public authService: AuthService,
    public projetctService: ProjectServiceService
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
    this.dialog.closeAll();
  }

  atualizarProjeto(){
    this.projetctService.atualizarProjeto(this.projetoForm.value).subscribe((resposta:any)=>{
      console.log(resposta);

    })
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
