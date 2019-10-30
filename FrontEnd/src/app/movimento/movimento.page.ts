import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MovimentoService } from 'src/services/domain/movimento.service';
import { NavController, AlertController } from '@ionic/angular';
import { MovimentoDTO } from 'src/models/movimento.dto';
import { MovimentoContaDTO } from 'src/models/movimentoconta.dto';

@Component({
  selector: 'app-movimento',
  templateUrl: './movimento.page.html',
  styleUrls: ['./movimento.page.scss'],
})
export class MovimentoPage implements OnInit {

  formGroup: FormGroup;

  movimento: MovimentoDTO = {} as MovimentoDTO;
  movimentoConta: MovimentoContaDTO[] = [] as Array<MovimentoContaDTO>;

  contaId = null;
  categoriaId = null;
  contaNome = null;
  categoriaNome = null;
  operacao = null;
  valor = null;
  complemento = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    public navCtrl: NavController, 
    public rota: Router,
    public alertCtrl: AlertController,
    public categoriaService: CategoriaService,
    public movimentoService: MovimentoService,
    public formBuilder: FormBuilder) {
  
  }

  ngOnInit() {

    this.operacao = this.activatedRoute.snapshot.paramMap.get('operacao');
    this.categoriaId = this.activatedRoute.snapshot.paramMap.get('categoriaid');
    this.contaId = this.activatedRoute.snapshot.paramMap.get('contaid');
    this.valor = this.activatedRoute.snapshot.paramMap.get('valor');
    this.complemento = this.activatedRoute.snapshot.paramMap.get('complemento');

    //busca a Conta inicial da operação
    this.categoriaService.find(this.contaId)
    .subscribe(response => {
      this.contaNome = response.nome;
      this.movimentoConta.push({conta:response,valor:0});
    },
    error => {}); 

    //busca a Categoria da operação
    this.categoriaService.find(this.categoriaId)
    .subscribe(response => {
      this.categoriaNome = response.nome;
      this.movimentoConta.push({conta:response,valor:0});
    },
    error => {}); 

    this.formGroup = this.formBuilder.group({
      data: [Date(), [Validators.required]],
      valor: [this.valor < 0 ? this.valor * -1 : this.valor, [Validators.required]],
      historico : [this.complemento, [Validators.maxLength(500)]]      
    });

  }

  inserirMovimento() {
    let sinal : number = (this.operacao == 'Recebi')? 1 : -1;  
    this.movimentoConta[0].valor   = this.formGroup.get('valor').value * sinal;
    this.movimentoConta[1].valor   = this.formGroup.get('valor').value * sinal * -1;
    this.movimento = {
        data : this.formGroup.get('data').value, 
        historico : this.formGroup.get('historico').value,
        contas : this.movimentoConta.map(x => {return {conta: x.conta, valor: x.valor}}) 
    };
    console.log(this.movimento);
    this.movimentoService.insert(this.movimento)
      .subscribe(response => {
        this.showInsertOk();
      },
      error => {});
}

  async showInsertOk() {
    let alert = this.alertCtrl.create({
      header: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    (await alert).present();
  }  
}
