import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroUsuarioEmpresaComponent } from './cadastro-usuario-empresa.component';

describe('CadastroUsuarioEmpresaComponent', () => {
  let component: CadastroUsuarioEmpresaComponent;
  let fixture: ComponentFixture<CadastroUsuarioEmpresaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CadastroUsuarioEmpresaComponent]
    });
    fixture = TestBed.createComponent(CadastroUsuarioEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
