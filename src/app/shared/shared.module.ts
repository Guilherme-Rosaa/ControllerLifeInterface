import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoUsuarioPipe } from '../models/pipes/tipo-usuario.pipe';



@NgModule({
  declarations: [TipoUsuarioPipe],
  imports: [
    CommonModule
  ],
  exports:[TipoUsuarioPipe]
})
export class SharedModule { }
