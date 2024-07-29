import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RespostaApi } from 'src/app/models/respostaApi';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {}
  @Output() toggle = new EventEmitter<void>();

  toggleSidebar() {
    this.toggle.emit();
  }

  abrirPerfilUsuario(){
    this.router.navigate(['/perfil-usuario']);
  }

  abrirGrid(){
    this.router.navigate(['/dashboard']);
  }

  sair() {
    this.authService.logout().subscribe((resposta: RespostaApi) => {
      if ('caches' in window) {
        caches
          .delete('token')
          .then(() => {
            this.toastr.success('Excluído com sucesso');
            this.router.navigate([''])
          })
          .catch((error) => {
            this.toastr.error(error);
          });
      } else {
        console.error('O navegador não suporta o Cache API');
        this.toastr.error('O navegador não suporta o Cache API');
      }
    });
  }
}
