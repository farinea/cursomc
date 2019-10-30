import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CategoriaDTO } from "../../models/categoria.dto";
import { API_CONFIG } from 'src/config/api.config';
import { Observable } from 'rxjs';
import { MovimentosDTO } from 'src/models/movimentos.dto';
import { formatDate } from '@angular/common';
import { SaldosDTO } from 'src/models/saldos.dto';
import { ComposicaoSaldosDTO } from 'src/models/composicaosaldos.dto';
import { BalanceteDTO } from 'src/models/balancete.dto';

@Injectable()
export class MovimentoContaService {

    constructor(public http: HttpClient) {

    }

    findMovimentos(conta: string) : Observable<MovimentosDTO[]> {
        return this.http.get<MovimentosDTO[]>(`${API_CONFIG.baseUrl}/movimentos/${conta}`);
    }

    findSaldos(data: string, tipoConta: string) : Observable<SaldosDTO[]> {
        return this.http.get<SaldosDTO[]>(`${API_CONFIG.baseUrl}/movimentos/saldos/${data}/${tipoConta}`);
    }

    findSaldoByConta(conta: string, data: string) : Observable<SaldosDTO> {
        return this.http.get<SaldosDTO>(`${API_CONFIG.baseUrl}/movimentos/saldo/${conta}/${data}`);
    }

    findComposicaoSaldos(data: string) : Observable<ComposicaoSaldosDTO[]> {
        return this.http.get<ComposicaoSaldosDTO[]>(`${API_CONFIG.baseUrl}/movimentos/composicao/${data}`);
    }

    findBalancete(ano: string) : Observable<BalanceteDTO[]> {
        return this.http.get<BalanceteDTO[]>(`${API_CONFIG.baseUrl}/movimentos/balancete/${ano}`);
    }
}