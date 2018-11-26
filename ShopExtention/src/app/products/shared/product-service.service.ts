import { Injectable } from '@angular/core';
import { Product } from './product.interface';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  productsArray: Product[] = [];
  result: Observable<any>;

  constructor(private httpClient: HttpClient) {

  }

  url = 'http://prestashopa.netglue.de/api';
  // This needs to be more secure
  key = 'LL11XQ47LUKNVVLQ3MY31UUW4UATBE4Q';
  // Get output in JSON instead of XML
  url_Addons = 'output_format=JSON&display=full';

  buildUrl(category, tag, locale) {
    if (!(category === undefined)) {
      console.log('Got category parameter, build request with category as filter');
      return this.url + '/' + 'products?ws_key=' + this.key + '&' + this.url_Addons + '&' + 'filter[id_category_default]=' + category;
    }
    if ((category === undefined)) {
      console.log('Got no category parameter, show all products');
      return this.url + '/' + 'products?ws_key=' + this.key + '&' + this.url_Addons;
    }
    if (!(tag === undefined)) {
      // IMPLEMENT WHEN TAGS ARE KNOWN
    }
  }

  getDynamicProducts(category, tag, locale): Product[] {
    // Call API here and get Products dynamically, depending on given URL parameters
    console.log('Getting JSON from REST API');
    this.result = this.httpClient.get(this.buildUrl(category, tag, locale));
    this.result.subscribe(data => {
      console.log(data);
      const numberOfProducts = data.products.length;
      for (let index = 0; index < numberOfProducts; index++) {

        const product = <Product>{};

        product.id = data.products[index].id;


        product.default_image_id = data.products[index].id_default_image;


        product.name = data.products[index].name[0].value;

        // Write method to build a proper price string, depening on which locale is given
        product.price = data.products[index].price.substring(0, data.products[index].price.length - 4) + ' €';


        product.availablilty = data.products[index].available_for_order;

        // Write method to remove unnecessary html-tags
        product.description = data.products[index].description_short[0].value.replace('<p>', '').replace('</p>', '');


        product.forsale = data.products[index].on_sale;

        // Get image url while using getProductImage method
        product.imageurl = this.getProductImage(product.id, product.default_image_id);

        // Get product url while using getProductLink method
        product.link = this.getProductLink(product.id);

        this.productsArray.push(product);

      }
      console.log(this.productsArray);
    }, error => {
      console.log(error);
    });
    return this.productsArray;
  }

  getProductImage(productid, imageid): string {
    const imageurl = this.url + '/images/products/' + productid + '/' + imageid + '&' + 'ws_key=' + this.key;
    return imageurl;
  }

  getProductLink(productid): string {
    const productlink = 'http://prestashopa.netglue.de/index.php?controller=product&id_product=' + productid;
    return productlink;
  }


}
