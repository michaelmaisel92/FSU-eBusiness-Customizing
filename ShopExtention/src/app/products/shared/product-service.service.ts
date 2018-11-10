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
        link: 'https://url_product_1',
        image: 'assets/images/default.jpg'
       },

       {
        name: 'Wein',
        link: 'https://url_product_2',
        image: ''
       },

       {
        name: 'Wasser',
        link: 'https://url_product_3',
        image: ''
       },

       {
        name: 'Urin',
        link: 'https://url_product_4',
        image: ''
       }
     ];
   }

   getDynamicProducts(): Product[] {
     // Call API here and get Products dynamically, depending on given URL parameters
    return [];
  }
}
