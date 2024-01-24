import { Injectable } from '@angular/core';
import {
  Action,
  Selector,
  State,
  StateContext,
  createSelector,
} from '@ngxs/store';
import { AddCart, delFormCart, DeleteAllFromCart } from '../actions/cart-action';
import { CartStateModel } from './cart-state-model';
import { Product } from '../models/product';
@State<CartStateModel>({
  name: 'products',
  defaults: {
    products: [],
  },
})
@Injectable()
export class CartState {
  @Selector()
  static getNbProduits(state: CartStateModel) {
    return state.products??[].length;
  }

  @Selector()
  static getProductsList(state: CartStateModel) {
    return state.products;
  }

  @Action(AddCart)
  add(
    { getState, patchState }: StateContext<CartStateModel>,
    { payload }: AddCart
  ) {
    const state = getState();
    patchState({
      products: [...state.products??[], payload],
    });
  }

  @Action(delFormCart)
  del(
    { getState, patchState }: StateContext<CartStateModel>,
    { payload }: delFormCart
  ) {
    const state = getState();
    console.log("Log");


    patchState({
      products: (state.products??[]).filter(
        (x:Product) => !(payload.name == x.name)
        
      ),
    });
  }

  @Action(DeleteAllFromCart)
  deleteAllFromCart({ setState }: StateContext<CartStateModel>): void {
    setState({ products: [] });
  }
}
