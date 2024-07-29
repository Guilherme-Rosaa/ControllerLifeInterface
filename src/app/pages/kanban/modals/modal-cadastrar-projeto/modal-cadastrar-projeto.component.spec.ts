import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastrarProjetoComponent } from './modal-cadastrar-projeto.component';

describe('ModalCadastrarProjetoComponent', () => {
  let component: ModalCadastrarProjetoComponent;
  let fixture: ComponentFixture<ModalCadastrarProjetoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCadastrarProjetoComponent]
    });
    fixture = TestBed.createComponent(ModalCadastrarProjetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
