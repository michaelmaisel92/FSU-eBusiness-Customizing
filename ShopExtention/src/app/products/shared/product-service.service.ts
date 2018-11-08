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
        name: 'Bier',
        link: 'https://url_product_1'
       },

       {
        name: 'Wein',
        link: 'https://url_product_2'
       },

       {
        name: 'Wasser',
        link: 'https://url_product_3'
       }

       {
        name: 'Urin',
        link: 'https://url_product_4'
       }
     ];
   }

   getDynamicProducts(): Product[] {
     // Call API here and get Products dynamically, depending on given URL parameters
    return [];
  }
}
