import { MovimentoContaDTO } from './movimentoconta.dto';
import { CategoriaDTO } from './categoria.dto';

export interface MovimentoDTO {
    data : string;
    historico : string;
    contas : MovimentoContaDTO[];
}