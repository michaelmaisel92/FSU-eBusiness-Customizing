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
  // This needs to be more secure
  key = "LL11XQ47LUKNVVLQ3MY31UUW4UATBE4Q";
  // Get output in JSON instead of XML
  url_Addons = "output_format=JSON&display=full";

  buildUrl() {
    return this.url + '/' + 'products?ws_key=' + this.key + '&' + this.url_Addons;
  }

  getDynamicProducts(): Product[] {
    // Call API here and get Products dynamically, depending on given URL parameters
    console.log("Getting JSON from REST API");
    this.result = this.httpClient.get(this.buildUrl());
    this.result.subscribe(data => {
      console.log(data);
      let numberOfProducts = data.products.length;
      for (let index = 0; index < numberOfProducts; index++) {

        var product = <Product>{};

        product.id = data.products[index].id;

        product.name = data.products[index].name[0].value;

        // Write method to build a proper price string
        product.price = data.products[index].price.substring(0, data.products[index].price.length - 4) + ' €';

        product.availablilty = data.products[index].available_for_order;

        // Write method to remove unnecessary html-tags
        product.description = data.products[index].description_short[0].value.replace('<p>','').replace('</p>','');

        product.forsale = data.products[index].on_sale;

        // Set image url while using getProductImage method
        product.imageurl = this.getProductImage(product.id);

        this.productsArray.push(product);

      }
      console.log(this.productsArray);
    }, error => {
      console.log(error);
    })
    return this.productsArray;
  }

  getProductImage(productid): string{
      // IMPLEMENT THIS ;)
    let imageid = '/16';
    let url = 'http://prestashopa.netglue.de/api/images/products/' + productid + imageid + '?ws_key=' + this.key;
    console.log(url);
    return url;
  }


}
