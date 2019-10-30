import { Component, OnInit, Pipe } from '@angular/core';
import { BalanceteDTO } from 'src/models/balancete.dto';
import { MovimentoContaService } from 'src/services/domain/movimentoconta.service';
import { BalanceteViewDTO } from 'src/models/balanceteview.dto';
import { formatDate } from '@angular/common';
import {DataSource} from '@angular/cdk/collections';

@Component({
  selector: 'app-balancete',
  templateUrl: './balancete.page.html',
  styleUrls: ['./balancete.page.scss']
})
export class BalancetePage implements OnInit {

  balancete: BalanceteDTO[];
  colunas: string[] = [];
  linhas: String[][] = new Array();
  balanceteView : BalanceteViewDTO[] = new Array();
  data: string;
  mesInicio: number | BigInteger | any;
  mesFim: number | BigInteger | any;
  dataSource: DataSource<BalanceteViewDTO>;
  
  constructor(
    public movimentoContaService: MovimentoContaService) { }

  ngOnInit() {
    this.data = formatDate(Date(),"dd-MM-yyyy","en-US");

    this.mesInicio = parseInt( this.data.substr(3,2) );
    this.mesFim = parseInt( this.data.substr(3,2) );

    this.buildBalancete();

  }

        //functions
        public buildBalancete() {
          this.movimentoContaService.findBalancete('2019')
          .subscribe(response => {
            this.balancete = response;
            //this.colunas = Object.keys(this.balancete[0]);
            //console.log(this.colunas);      
            this.colunas.push('categoria');
            this.balancete.forEach(b => {if (b.mes>=this.mesInicio && b.mes<=this.mesFim) {
              let strMes : string = this.mesAbreviado(String(b.mes));
              if (this.colunas.includes(strMes)) {
                console.log('coluna ' + strMes)
              } else {
                this.colunas.push(strMes);
              }
            }
            });
            this.colunas.push('total');
      
            this.balancete.forEach(b => {if (b.mes>=this.mesInicio && b.mes<=this.mesFim) {
              let strMes : string = this.mesAbreviado(String(b.mes));
              this.addBalanceteView(b);
            }
            });
      
            this.balanceteView.forEach(b => {
              b.total = Math.trunc(((b.jan || 0) + 
                        (b.fev || 0) + 
                        (b.mar || 0) + 
                        (b.abr || 0) + 
                        (b.mai || 0) + 
                        (b.jun || 0) + 
                        (b.jul || 0) + 
                        (b.ago || 0) + 
                        (b.set || 0) + 
                        (b.out || 0) + 
                        (b.nov || 0) + 
                        (b.dez || 0)) * 100) / 100;
            });
          },
          error => {});       
        }

        public addBalanceteView(obj: BalanceteDTO) {
          let cat : String = obj.categoriaNome;
          let indice  = this.balanceteView.find(x => x.categoria == cat);
          console.log(indice);
          if (indice != null) {
            if (String(obj.mes) == '1') { indice.jan=Math.trunc(obj.total * -100) / 100 };
            if (String(obj.mes) == '2') { indice.fev=Math.trunc(obj.total * -100) / 100 };
            if (String(obj.mes) == '3') { indice.mar=Math.trunc(obj.total * -100) / 100 };
            if (String(obj.mes) == '4') { indice.abr=Math.trunc(obj.total * -100) / 100 };
            if (String(obj.mes) == '5') { indice.mai=Math.trunc(obj.total * -100) / 100 };
            if (String(obj.mes) == '6') { indice.jun=Math.trunc(obj.total * -100) / 100 };
            if (String(obj.mes) == '7') { indice.jul=Math.trunc(obj.total * -100) / 100 };
            if (String(obj.mes) == '8') { indice.ago=Math.trunc(obj.total * -100) / 100 };
            if (String(obj.mes) == '9') { indice.set=Math.trunc(obj.total * -100) / 100 };
            if (String(obj.mes) == '10') { indice.out=Math.trunc(obj.total * -100) / 100 };
            if (String(obj.mes) == '11') { indice.nov=Math.trunc(obj.total * -100) / 100 };
            if (String(obj.mes) == '12') { indice.dez=Math.trunc(obj.total * -100) / 100 };
          } else 
          {
            var bv: BalanceteViewDTO = {categoria: "Teste", tipoConta: 'CONTA_RECEITA', total: 0};
            bv.categoria = obj.categoriaNome;
            bv.tipoConta = obj.tipoConta;
            if (String(obj.mes) == '1') { bv.jan=Math.trunc(obj.total * -100) / 100 };
            if (String(obj.mes) == '2') { bv.fev=Math.trunc(obj.total * -100) / 100 };
            if (String(obj.mes) == '3') { bv.mar=Math.trunc(obj.total * -100) / 100 };
            if (String(obj.mes) == '4') { bv.abr=Math.trunc(obj.total * -100) / 100 };
            if (String(obj.mes) == '5') { bv.mai=Math.trunc(obj.total * -100) / 100 };
            if (String(obj.mes) == '6') { bv.jun=Math.trunc(obj.total * -100) / 100 };
            if (String(obj.mes) == '7') { bv.jul=Math.trunc(obj.total * -100) / 100 };
            if (String(obj.mes) == '8') { bv.ago=Math.trunc(obj.total * -100) / 100 };
            if (String(obj.mes) == '9') { bv.set=Math.trunc(obj.total * -100) / 100 };
            if (String(obj.mes) == '10') { bv.out=Math.trunc(obj.total * -100) / 100 };
            if (String(obj.mes) == '11') { bv.nov=Math.trunc(obj.total * -100) / 100 };
            if (String(obj.mes) == '12') { bv.dez=Math.trunc(obj.total * -100) / 100 };
            this.balanceteView.push(bv);
          }
        }

        public addMes() {
          if (this.mesInicio > 1) {
            this.mesInicio -= 1;

            this.colunas = [];

            this.buildBalancete();
          }
        }

        public decreaseMes() {
          if (this.mesInicio < this.mesFim) {
            this.mesInicio += 1;

            this.colunas = [];

            this.buildBalancete();
          }
        }

        public filterReceita(b): any[] {  
          return b.filter(i => i.tipoConta.value === '4');
      }

      public sumMes(mes: String, tipo: String) {
        let filteredBalancete : BalanceteViewDTO[] = this.balanceteView.filter(b => (b.tipoConta === tipo));
        let sumMes : number = 0;
        filteredBalancete.forEach(b => {
          switch(mes) {
            case 'jan' :
              sumMes += b.jan || 0;
              break;
            case 'fev' :
              sumMes += b.fev || 0;
              break;
            case 'mar' :
              sumMes += b.mar || 0;
              break;
            case 'abr' :
              sumMes += b.abr || 0;
              break;
            case 'mai' :
              sumMes += b.mai || 0;
              break;
            case 'jun' :
              sumMes += b.jun || 0;
              break;
            case 'jul' :
              sumMes += b.jul || 0;
              break;
            case 'ago' :
              sumMes += b.ago || 0;
              break;
            case 'set' :
              sumMes += b.set || 0;
              break;
            case 'out' :
              sumMes += b.out || 0;
              break;
            case 'nov' :
              sumMes += b.nov || 0;
              break;
            case 'dez' :
              sumMes += b.dez || 0;
              break;
            case 'jan' :
              sumMes += b.jan || 0;
              break;
            case 'total' :
              sumMes += b.total || 0;
              break;
          }
        })
        return Math.trunc(sumMes * 100) / 100;
    }
      
      //PRIVATE FUNCTIONS
      private mesAbreviado(mes: String) {
        let strMes : string;
        switch(mes) {
          case '1' :
               strMes = 'jan';
               break;
          case '2' :
               strMes = 'fev';
               break;
          case '3' :
               strMes = 'mar';
               break;
          case '4' :
               strMes = 'abr';
               break;
          case '5' :
               strMes = 'mai';
               break;
          case '6' :
               strMes = 'jun';
               break;
          case '7' :
               strMes = 'jul';
               break;
          case '8' :
               strMes = 'ago';
               break;
          case '9' :
               strMes = 'set';
               break;
          case '10' :
               strMes = 'out';
               break;
          case '11' :
               strMes = 'nov';
               break;
          case '12' :
               strMes = 'dez';
               break;
        }
        return strMes;
      }
}
