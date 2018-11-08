import { Injectable } from '@angular/core';
import { Product } from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  products: Product[];

  constructor() {

   }

   getStaticProducts(): Product[] {
     return [
       {
        name: 'product_1',
        link: 'url_product_1'
       },

       {
        name: 'product_1',
        link: 'url_product_1'
       },

       {
        name: 'product_1',
        link: 'url_product_1'
       }
     ];
   }
}
