import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EnumStatus } from 'src/app/models/enums/enums-status';
import { Projeto } from 'src/app/models/projeto';
import { RespostaApi } from 'src/app/models/respostaApi';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectServiceService } from 'src/app/services/project-service.service';

@Component({
  selector: 'app-modal-cadastrar-projeto',
  templateUrl: './modal-cadastrar-projeto.component.html',
  styleUrls: ['./modal-cadastrar-projeto.component.scss'],
})
export class ModalCadastrarProjetoComponent implements OnInit {
  EnumStatus: any;

  projetoForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    responsaveis: [''],
    dataEntrega: [new Date(), Validators.required],
    status: [EnumStatus.EmDesenvolvimento, Validators.required],
  });
  usuarios: Usuario[] = [];
  usuario!: Usuario;
  statusOptions = [
    { value: EnumStatus.AFazer, label: 'A Fazer' },
    { value: EnumStatus.EmDesenvolvimento, label: 'Em Desenvolvimento' },
    { value: EnumStatus.Teste, label: 'Teste' },
    { value: EnumStatus.Concluido, label: 'Concluído' }
  ];

  constructor(
    private service: ProjectServiceService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    public authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buscarUsuarios();
  }

  onSubmit() {
    throw new Error('Method not implemented.');
  }
  fecharModal() {
    this.dialog.closeAll();
  }

  cadastrarProjeto() {
    let projeto: Projeto = {
      id: '00000000-0000-0000-0000-000000000000',
      name: this.projetoForm.get('name')?.value,
      description: this.projetoForm.get('description')?.value,
      responsaveis: this.usuario,
      dataCadastro: new Date(),
      dataAtualizacao: undefined,
      dataEntrega: this.projetoForm.get('dataEntrega')?.value,
      status: EnumStatus.EmDesenvolvimento,
    };

    this.service.cadastrarProjetos(projeto).subscribe(
      (resposta: RespostaApi) => {
        this.toastr.success('Projeto cadastrado com sucesso!');
      },
      (error: any) => {
        this.toastr.error(error.error.messages, 'Erro ao cadastrar projeto');
      }
    );
  }

  buscarUsuarios(){
    this.authService.buscarUsuarios().subscribe((respota: RespostaApi) => {
      this.usuarios = respota.data;
    })
  }

  compareUsuarios(u1: Usuario, u2: Usuario): boolean {
    return u1 && u2 ? u1.id === u2.id : u1 === u2;
  }

  selecionarUsuario(event :any){
    this.usuario = this.usuarios.find(usu => usu.id == event.value)!;
  }
}
