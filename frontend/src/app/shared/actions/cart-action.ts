import { Product } from '../models/product';

export class AddCart {
  static readonly type = '[Product] Add';

  constructor(public payload: Product) {}
}

export class delFormCart {
  static readonly type = '[Product] Del';

  constructor(public payload: Product) {}
}

export class DeleteAllFromCart {
  static readonly type = '[Cart] Delete All From Cart';
}
