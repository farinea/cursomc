import { Component, OnInit } from '@angular/core';
import { NavController, MenuController  } from '@ionic/angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {

  creds : CredenciaisDTO = {
    email: "wagnereffe@gmail.com",
    senha: "123"
  };

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService) {

  }

  ionViewWillEnter() {
    this.menu.swipeGesture(false);
  }
    
  ionViewDidLeave() {
    this.menu.swipeGesture(true);
  }

  ionViewDidEnter() {
    /*this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.navigateRoot('contas');
      },
      */
  }

  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.navigateRoot('resumo');
      },
      error => {});    
  }

  signup() {
    this.navCtrl.navigateRoot('signup');
  }
}
