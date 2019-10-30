import { Component, OnInit } from '@angular/core';
import { ComposicaoSaldosDTO } from 'src/models/composicaosaldos.dto';
import { MovimentoContaService } from 'src/services/domain/movimentoconta.service';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { NavController } from '@ionic/angular';
import { Label } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-resumo',
  templateUrl: './resumo.page.html',
  styleUrls: ['./resumo.page.scss'],
})
export class ResumoPage implements OnInit {

  composicao: ComposicaoSaldosDTO[];
  data: string;
  patrimonioTotal: number = 0;

  // Doughnut
  public doughnutChartLabels: Label[] = ['CONTAS','IMOBILIZADO'];
  public doughnutChartData: number[] = [200,500];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(
    public navCtrl: NavController, 
    public categoriaService: CategoriaService,
    public movimentoContaService: MovimentoContaService
    ) {
   }

  ngOnInit() {
    this.data = formatDate(Date(),"dd-MM-yyyy","en-US");

    this.movimentoContaService.findComposicaoSaldos(this.data)
    .subscribe(response => {
      this.composicao = response;
      this.doughnutChartLabels.splice(0,this.doughnutChartLabels.length);
      this.doughnutChartData.splice(0,this.doughnutChartData.length);
      this.composicao.forEach(item => {
        this.patrimonioTotal += item.saldo;
        this.doughnutChartLabels.push('' + item.tipoConta);
        this.doughnutChartData.push(item.saldo);
        console.log("DoughnutChartLabels", this.doughnutChartLabels);
        console.log("DoughnutChartData", this.doughnutChartData);    
      });
    },
    error => {}); 
  }

  redirect(tipoConta: string) {
    switch (tipoConta) {
      case 'CONTA_CORRENTE' :
           this.navCtrl.navigateRoot(`/contas/1`)
           break;
      case 'CONTA_INVESTIMENTO' :
           this.navCtrl.navigateRoot(`/contas/2`);
           break;
      case 'CONTA_IMOBILIZADO' :
           this.navCtrl.navigateRoot(`/contas/3`);
           break;
      default :
           this.navCtrl.navigateRoot(`/contas/1`)
           break;
    }
  }
  
}
