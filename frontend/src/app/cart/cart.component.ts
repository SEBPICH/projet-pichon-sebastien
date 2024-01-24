import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Product } from '../shared/models/product';
import { DeleteAllFromCart, delFormCart } from '../shared/actions/cart-action';
import { CartState } from '../shared/states/cart-state';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  totalPrice: number = 0;
  productNumber: number = 0;
  message: string = '';

  constructor(private store: Store, public dialog: MatDialog) {}

  @Select(CartState.getProductsList) liste$!: Observable<Product[]>;

  ngOnInit() {
    this.liste$.subscribe((panier) => {
      this.productNumber = panier.length;
      this.totalPrice = this.calculateTotalPrice(panier);
      this.totalPrice.toLocaleString();
      
    });
  }

  delFormCart(p: Product): void {
    this.store.dispatch(new delFormCart(p));
    this.showMessage(`'${p.name}' a été supprimé du panier.`);
  }

  showMessage(message: string): void {
    this.message = message;
    setTimeout(() => {
      this.message = '';
    }, 3000);
  }

  calculateTotalPrice(panier: Product[]): number {
    return panier.reduce((total, p) => total + this.parsePrice(p.price), 0);
  }

  parsePrice(price: number | string): number {
    // Ensure price is a valid number
    return typeof price === 'number' ? price : parseFloat(price.toString().replace(',', '.'));
  }

  clearCart(): void {
    this.store.dispatch(new DeleteAllFromCart());
  }

  showOrderSummary(): void {
    alert(`Vous avez commandé ${this.productNumber} éléments d'une Formule 1 pour un total de ${this.totalPrice}€`);
    this.clearCart();
  }
}
