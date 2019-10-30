import { MovimentoContaDTO } from './movimentoconta.dto';
import { CategoriaDTO } from './categoria.dto';

export interface SaldosDTO {
    conta : CategoriaDTO;
    saldo : number;
}