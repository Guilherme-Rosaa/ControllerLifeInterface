import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RespostaApi } from 'src/app/models/respostaApi';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-cadastro-empresa',
  templateUrl: './cadastro-empresa.component.html',
  styleUrls: ['./cadastro-empresa.component.scss'],
})
export class CadastroEmpresaComponent {
  formulario: FormGroup;

  constructor(
    private service: EmpresaService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.formulario = this.formBuilder.group({
      Nome: [''],
      UsuarioDto: this.formBuilder.group({
        Login: [''],
        Senha: [''],
        Email: [''],
        EmpresaId: null,
      }),
    });
  }

  cadastrar() {
    this.service
      .cadastrarEmpresa(this.formulario.value)
      .subscribe((resposta: RespostaApi) => {
        if (resposta.success) {
          this.router.navigate(['/']);
        }
      });
  }

  voltar() {
    this.router.navigate(['/']);
  }
}
