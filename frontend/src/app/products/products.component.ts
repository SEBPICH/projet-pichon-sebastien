import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { CatalogService } from '../catalog/catalog.service';
import { Product } from '../shared/models/product';
import { AddCart } from '../shared/actions/cart-action';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [CatalogService],
})

export class ProductsComponent implements OnInit {
  recherche: string = '';
  products$: Observable<Product[]>;


  constructor(private catalogService: CatalogService, private store: Store) {
    this.products$ = this.catalogService.getProducts();

  }

  ngOnInit() {
    this.searchProducts();
  }

  searchProducts() {
    this.products$ = this.catalogService.getProducts(this.recherche);
  }

  addCart(p:Product) {
    function showMessage() {

      const messageContainer = document.getElementById("MessageAdd") as HTMLDivElement;
      messageContainer.innerText = `'${p.name}' a été ajouté au panier.`;
      setTimeout(() => {
          messageContainer.innerText = "";
      }, 3000);}
    

    this.store.dispatch(new AddCart(p));

    showMessage();

  }  
}
  
