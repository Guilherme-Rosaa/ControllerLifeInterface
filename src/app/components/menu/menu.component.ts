import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Output() toggle = new EventEmitter<void>();

  constructor(
    private router: Router
  ){

  }

  toggleSidebar() {
    this.toggle.emit();
  }

  abrirPerfilUsuario(){
    this.router.navigate(['perfil'])
  }
}
