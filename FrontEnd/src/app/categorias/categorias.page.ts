import { Component, OnInit } from '@angular/core';
import { CategoriaDTO } from 'src/models/categoria.dto';
import { NavController, NavParams } from '@ionic/angular';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { API_CONFIG } from 'src/config/api.config';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: CategoriaDTO[];

  tipoConta = null;
  titulo = 'Categorias';

  conta: CategoriaDTO;
  contaId = null;
  contaNome = null;
  operacao = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    public categoriaService: CategoriaService) {
  }
  
  ngOnInit() {

    this.operacao = this.activatedRoute.snapshot.paramMap.get('operacao');
    this.tipoConta = this.activatedRoute.snapshot.paramMap.get('tipoconta');
    this.contaId = this.activatedRoute.snapshot.paramMap.get('contaid');

    if (this.tipoConta > 1) {this.titulo="Categorias"} else {this.titulo="Contas"};

    //busca Categorias
    this.categoriaService.findByTipo(this.tipoConta)
      .subscribe(response => {
        this.items = response;
        let position = this.items.findIndex(x => x.id == this.contaId);
        if (position != -1) {
          this.items.splice(position, 1);
        }
      },
      error => {}); 

    //busca a Conta inicial da operação
    this.categoriaService.find(this.contaId)
    .subscribe(response => {
      this.conta = response;
      this.contaNome = response.nome;
    },
    error => {}); 

  }

}
