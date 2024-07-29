import { EnumTipoUsuario } from './enums/enums-tipo-usuario';

export interface Usuario {
  id: string;
  username: string;
  password: string;
  email: string;
  typeUser: EnumTipoUsuario;
}
