import { EnumStatus } from "./enums/enums-status";
import { Usuario } from "./usuario";

export interface Projeto {
  id: string;
  name: string;
  description: string;
  responsaveis: Usuario;
  dataCadastro: Date;
  dataAtualizacao?: Date;
  dataEntrega: Date;
  status: EnumStatus;
}
