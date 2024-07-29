import { Pipe, PipeTransform } from '@angular/core';
import { EnumTipoUsuario } from '../enums/enums-tipo-usuario';

@Pipe({
  name: 'tipoUsuario'
})
export class TipoUsuarioPipe implements PipeTransform {

  transform(value: EnumTipoUsuario): string {
    switch(value) {
      case EnumTipoUsuario.Adm:
        return 'Administrador';
      case EnumTipoUsuario.User:
        return 'Usuário';
      default:
        return 'Desconhecido';
    }
  }

}
