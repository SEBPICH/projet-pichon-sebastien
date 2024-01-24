import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TetiereComponent } from './tetiere/tetiere.component';
import { FooterComponent } from './footer/footer.component';


import { NgxsModule } from '@ngxs/store';

import { BrowserModule } from '@angular/platform-browser';
import { CatalogModule } from './catalog/catalog.module';
import { CartComponent } from './cart/cart.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CartState } from './shared/states/cart-state';
import { ProductsComponent } from './products/products.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './api.service';
import { ApiHttpInterceptor } from './http-interceptor';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InscriptionComponent } from './inscription/inscription.component';
import { AcceuilComponent } from './acceuil/acceuil.component'; 
import { ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './account/account.component';
import { ThousandsSeparatorPipe } from './thousands-separator.pipe';

const routes: Routes = [
  { path: '', component: AcceuilComponent },
  { path: 'accueil', component: AcceuilComponent},
  { path: 'cart', component: CartComponent},
  { path: 'products', component: ProductsComponent },
  { path: 'inscription', component: InscriptionComponent},
  { path : 'account', component: AccountComponent},
];

@NgModule({
  imports: [BrowserModule, CatalogModule, NgxsModule.forRoot([CartState]), RouterModule.forRoot(routes), FormsModule, HttpClientModule, ReactiveFormsModule, MatDialogModule],
  declarations: [AppComponent, TetiereComponent, FooterComponent, CartComponent, InscriptionComponent, AcceuilComponent, AccountComponent, ThousandsSeparatorPipe],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true },
    ApiService,
  
  ],
  bootstrap: [AppComponent],
})

export class AppModule {}
