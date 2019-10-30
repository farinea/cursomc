import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  { 
    path: 'contas/:tipoConta', 
    loadChildren: './contas/contas.module#ContasPageModule' 
  },
  { 
    path: 'signup', 
    loadChildren: './signup/signup.module#SignupPageModule' },
  { 
    path: 'operacao/:contaid', 
    loadChildren: './operacao/operacao.module#OperacaoPageModule' 
  },
  { 
    path: 'categorias/:operacao/:tipoconta/:contaid', 
    loadChildren: './categorias/categorias.module#CategoriasPageModule' 
  },
  { 
    path: 'movimento/:operacao/:contaid/:categoriaid', 
    loadChildren: './movimento/movimento.module#MovimentoPageModule' },
  { 
    path: 'movimento/:operacao/:contaid/:categoriaid/:valor/:complemento', 
    loadChildren: './movimento/movimento.module#MovimentoPageModule' },
  { path: 'resumo', loadChildren: './resumo/resumo.module#ResumoPageModule' },
  { path: 'balancete', loadChildren: './balancete/balancete.module#BalancetePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
