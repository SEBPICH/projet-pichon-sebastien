import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../shared/models/product';
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: Array<Product>, searchText: string): Array<Product> {
    if (!items) return [];
    if (!searchText) return items;

    return items.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
