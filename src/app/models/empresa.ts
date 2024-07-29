import { Usuario } from "./usuario";

export interface Empresa {
  Id: string,
  Nome: string,
  DataCadastro: Date,
  DataAtualizacao: Date,
  usuarios: Usuario[]
}
