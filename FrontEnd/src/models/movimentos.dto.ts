import { MovimentoContaDTO } from './movimentoconta.dto';
import { CategoriaDTO } from './categoria.dto';

export interface MovimentosDTO {
    data : string;
    historico : string;
    conta : CategoriaDTO;
    valor : number;
    id : number;
}