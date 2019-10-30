import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CategoriaService } from 'src/services/domain/categoria.service';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MovimentoService } from 'src/services/domain/movimento.service';
import { MovimentoContaService } from 'src/services/domain/movimentoconta.service';
import { ChartsModule } from 'ng2-charts';
import { ClienteService } from 'src/services/domain/cliente.service';
import { CidadeService } from 'src/services/domain/cidade.service';
import { EstadoService } from 'src/services/domain/estado.service';
import { AuthService } from 'src/services/auth.service';
import { StorageService } from 'src/services/storage.service';
import { JwtModule } from '@auth0/angular-jwt';
import { MatDialogModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatRippleModule, MatMenuModule, MatIconModule, MatCardModule, MatTabsModule, MatSidenavModule, MatListModule, MatToolbarModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatSelectModule, MatDatepickerModule  } from "@angular/material";
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    DialogBoxComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ChartsModule,
    ReactiveFormsModule,
    JwtModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRippleModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    AppRoutingModule,
    MatSelectModule,
    MatDatepickerModule,
    BrowserAnimationsModule
  ],
  exports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRippleModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FormBuilder,
    ReactiveFormsModule,
    CategoriaService,
    MovimentoService,
    MovimentoContaService,
    CidadeService,
    EstadoService,
    ClienteService,
    AuthService,
    StorageService
  ],
  bootstrap: [AppComponent],
  entryComponents: [DialogBoxComponent]
})
export class AppModule {}
