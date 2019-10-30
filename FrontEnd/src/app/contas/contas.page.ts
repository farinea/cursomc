import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { CategoriaDTO } from 'src/models/categoria.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { SaldosDTO } from 'src/models/saldos.dto';
import { formatDate } from '@angular/common';
import { MovimentoContaService } from 'src/services/domain/movimentoconta.service';
import { Label } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.page.html',
  styleUrls: ['./contas.page.scss'],
})
export class ContasPage implements OnInit {

  items: SaldosDTO[];
  categoria: CategoriaDTO;
  teste = {};
  data: string;
  serverErrorMessages: string[] = null;
  tipoConta: string;
  saldoTotal: number = 0;
  title: string;

    // Doughnut
    public doughnutChartLabels: Label[] = ['CONTAS','IMOBILIZADO'];
    public doughnutChartData: number[] = [200,500];
    public doughnutChartType: ChartType = 'doughnut';
  
  
  constructor(
    private activatedRoute: ActivatedRoute,
    public navCtrl: NavController, 
    public categoriaService: CategoriaService,
    public movimentoContaService: MovimentoContaService,
    private router: Router,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.tipoConta = this.activatedRoute.snapshot.paramMap.get('tipoConta');

    switch (this.tipoConta) {
      case '1' :
           this.title = 'Contas';
           break;
      case '2' :
           this.title = 'Investimento';
           break;
      case '3' :
           this.title = 'Imobilizado';
           break;
      case '4' :
           this.title = 'Receitas';
           break;
      case '5' :
           this.title = 'Despesas';
           break;
      default :
            this.title = 'Contas';
            break;
    } 


    this.data = formatDate(Date(),"dd-MM-yyyy","en-US");
    this.movimentoContaService.findSaldos(this.data, this.tipoConta)
    .subscribe(response => {
      this.items = response;
      this.items.forEach(item => {
        this.saldoTotal += item.saldo;
      });
    },
    error => {}); 

  }

  // events
    public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
      console.log(event, active);
    }
  
    public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
      console.log(event, active);
    }

  
  editConta(id : string) {

    console.log(id);

    this.categoria = {} as CategoriaDTO;

    this.categoriaService.find(id)
    .subscribe(response => {
      console.log(response);
      this.categoria = response;
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
  
      dialogConfig.data = {
        id: 1,
        title: 'Editar Conta',
        data: { nome: this.categoria.nome, saldoInicial: this.categoria.saldoInicial }
      };
  
      const dialogRef = this.dialog.open(DialogBoxComponent,
          dialogConfig);
  
  
      dialogRef.afterClosed().subscribe(
          val => {
            console.log(val);
            if (val != 'close') {  
              console.log("Dialog output:", val);
              this.categoria.nome = val.nome;
              this.categoria.saldoInicial = val.saldoInicial;
              this.categoriaService.update(this.categoria)
              .subscribe(
                category => this.actionsForSuccess(category),
                error => this.actionsForError(error)
              )
            }
          }
      );
    },
    error => {}); 

}

insertConta() {
    this.categoria = {} as CategoriaDTO;

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: 1,
      title: 'Inserir Conta',
      data: { nome: this.categoria.nome, saldoInicial: this.categoria.saldoInicial }
    };

    const dialogRef = this.dialog.open(DialogBoxComponent,
        dialogConfig);


    dialogRef.afterClosed().subscribe(
        val => {
          console.log(val);
          if (val != 'close') {
            console.log("Dialog output:", val);
            this.categoria.nome = val.nome;
            this.categoria.saldoInicial = val.saldoInicial;
            switch (this.tipoConta) {
              case '1' :
                   this.categoria.tipoConta = 'CONTA_CORRENTE';
                   break;
              case '2' :
                   this.categoria.tipoConta = 'CONTA_INVESTIMENTO';
                   break;
              case '3' :
                   this.categoria.tipoConta = 'CONTA_IMOBILIZADO';
                   break;
              case '4' :
                   this.categoria.tipoConta = 'CONTA_RECEITA';
                   break;
              case '5' :
                   this.categoria.tipoConta = 'CONTA_DESPESA';
                   break;
              default :
                    this.categoria.tipoConta = 'CONTA_CORRENTE';
                    break;
            } 
            this.categoriaService.insert(this.categoria)
            .subscribe(
              category => this.actionsForSuccess(category),
              error => this.actionsForError(error)
            )
          }
        } 
    );
}

redirect(id: string) {
  this.navCtrl.navigateRoot(`/operacao/${id}`);
}

//Private Methods

private actionsForSuccess(category: CategoriaDTO) {
  // toastr.success("Solicitação processada com sucesso!");

  //redirect/reload component page
  //this.router.navigateByUrl("entries", {skipLocationChange: true}).then(
  //  () => this.router.navigate(["entries", entry.id, "edit"])
  //)
  console.log('Sucesso!');

  //location.reload();
}

private actionsForError(error: any) {
  // toastr.error("Ocorreu um erro ao processar a solicitação!");
  
  //this.submittingForm = false;

  if(error.status == 422) {
    this.serverErrorMessages = JSON.parse(error._body).errors;
  }
  else {
    this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, tente mais tarde."]
  }
}


}
