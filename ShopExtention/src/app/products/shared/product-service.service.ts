import { Injectable } from '@angular/core';
import { Product } from './product.interface';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  productsArray: Product[] = [];
  result: Observable<any>;

  constructor(private httpClient: HttpClient) {

  }

  url = "http://prestashopa.netglue.de/api";
  key = "LL11XQ47LUKNVVLQ3MY31UUW4UATBE4Q";
  url_Addons = "output_format=JSON&display=full";

  buildUrl() {
    return this.url + '/' + 'products?ws_key=' + this.key + '&' + this.url_Addons;
  }

  getDynamicProducts(): Product[] {
    // Call API here and get Products dynamically, depending on given URL parameters
    console.log("Getting JSON from REST API");
    this.result = this.httpClient.get(this.buildUrl());
    this.result.subscribe(data => {
      let numberOfProducts = data.products.length;
      for (let index = 0; index < numberOfProducts; index++) {

        var product = <Product>{};
        product.name = data.products[index].name[0].value;
        product.price = data.products[index].price;
        product.availablilty = data.products[index].available_for_order;
        product.description = data.products[index].description_short[0].value;
        product.forsale = data.products[index].on_sale;

        this.productsArray.push(product);

      }
      console.log(this.productsArray);
    }, error => {
      console.log(error);
    })
    return this.productsArray;
  }


}
