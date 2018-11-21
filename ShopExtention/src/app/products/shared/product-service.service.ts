import { Injectable } from '@angular/core';
import { Product } from './product.interface';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  products: Product[];
  result:Observable<any>;

  constructor(private httpClient: HttpClient) {

   }

  //URL
  url = "http://prestashopa.netglue.de/api";
  key = "LL11XQ47LUKNVVLQ3MY31UUW4UATBE4Q";
  url_Addons = "output_format=JSON&display=full";

  //Requests
  categorie = "categories";
  product = "products";

  //Array Buffer
  Products = [];
  Categories = [];


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

  buildUrl(type){
    return this.url + '/' + type + '?ws_key=' + this.key+ '&'+ this.url_Addons;
  } 

  getRequest(type){
    this.result = this.httpClient.get(this.buildUrl(type));
      this.result.subscribe( data => {
        console.log( data );
        if (type == this.product) {
          this.Products = data; 
          console.log(this.Products);
          console.log(data.products[0].name[0].value);
        } else {
          this.Categories = data;
          console.log(this.Categories);
          console.log(data.categories[0].name[0].value); 
        }
      }, error => {
        console.log( error );
      })
  }


}
