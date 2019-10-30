import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { CategoriaDTO } from 'src/models/categoria.dto';
import { MovimentosDTO } from 'src/models/movimentos.dto';
import { MovimentoContaService } from 'src/services/domain/movimentoconta.service';
import { SaldosDTO } from 'src/models/saldos.dto';
import { formatDate } from '@angular/common';
import { MovimentoService } from 'src/services/domain/movimento.service';
import { parse } from 'url';
import { MovimentoDTO } from 'src/models/movimento.dto';

@Component({
  selector: 'app-operacao',
  templateUrl: './operacao.page.html',
  styleUrls: ['./operacao.page.scss'],
}) 
export class OperacaoPage implements OnInit {

  contaId = null;
  contaNome = null;
  conta: CategoriaDTO;
  movimentos: MovimentosDTO[];
  movimento: MovimentoDTO;
  saldos: SaldosDTO;
  data: string;
  hoje: string;
  tipoConta: string;
  range: number = 5;

  constructor(
    private activatedRoute: ActivatedRoute,
    public navCtrl: NavController, 
    public categoriaService: CategoriaService,
    public movimentoContaService: MovimentoContaService,
    public movimentoService: MovimentoService
  ) { }

  ngOnInit() {

    this.contaId = this.activatedRoute.snapshot.paramMap.get('contaid');

    this.categoriaService.find(this.contaId)
      .subscribe(response => {
        this.conta = response;
        this.contaNome = response.nome;
        this.tipoConta = this.getTipoConta(response.tipoConta);
        /*
        switch (response.tipoConta) {
          case 'CONTA_CORRENTE' :
               this.tipoConta = '1';
               break;
          case 'CONTA_INVESTIMENTO' :
               this.tipoConta = '2';
               break;
          case 'CONTA_IMOBILIZADO' :
               this.tipoConta = '3';
               break;
          case 'CONTA_RECEITA' :
               this.tipoConta = '4';
               break;
          case 'CONTA_DESPESA' :
               this.tipoConta = '5';
               break;
          default :
                this.tipoConta = '1';
                break;
        }  */
      },
      error => {}); 

      this.movimentoContaService.findMovimentos(this.contaId)
      .subscribe(response => {
        this.movimentos = response;
      },
      error => {});   

      this.hoje = formatDate(Date(),"dd/MM/yyyy","en-US");
      this.data = formatDate(Date(),"dd-MM-yyyy","en-US");
      this.movimentoContaService.findSaldoByConta(this.contaId,this.data)
      .subscribe(response => {
        this.saldos = response;
      },
      error => {}); 
  }

  public addRange() {
    this.range += 5;
  }

  public copyRegister(index: number) {
    let operacao =  this.movimentos[index].valor > 0 ? 'Recebi' : 'Paguei';
    this.movimentoService.find(String(this.movimentos[index].id))
    .subscribe(response => {
      this.movimento = response;
      let tipoConta1 = this.getTipoConta(this.movimento.contas[0].conta.tipoConta);
      let tipoConta2 = this.getTipoConta(this.movimento.contas[1].conta.tipoConta);
      if ( tipoConta1 < 4 && tipoConta2 < 4) { 
         operacao = 'Transferi' 
        };
      this.navCtrl.navigateRoot(`/movimento/${operacao}/${this.movimento.contas[0].conta.id}/${this.movimento.contas[1].conta.id}/${this.movimento.contas[0].valor}/${this.movimento.historico}`);
    },
    error => {});   

  }

  private getTipoConta(tipo: string) {
    let tipoContaInt;
    switch (tipo) {
      case 'CONTA_CORRENTE' :
           tipoContaInt = '1';
           break;
      case 'CONTA_INVESTIMENTO' :
           tipoContaInt = '2';
           break;
      case 'CONTA_IMOBILIZADO' :
           tipoContaInt = '3';
           break;
      case 'CONTA_RECEITA' :
           tipoContaInt = '4';
           break;
      case 'CONTA_DESPESA' :
           tipoContaInt = '5';
           break;
      default :
            tipoContaInt = '1';
            break;
    } 
    return tipoContaInt;
  }
}
