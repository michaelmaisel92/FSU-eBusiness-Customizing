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

  buildUrl(category, tag) {
    if (!(category === undefined)) {
      console.log('Category parameter transmitted, build request with category as filter ...');
      return this.url + '/' + 'products?ws_key=' + this.key + '&' + this.url_Addons + '&' + 'filter[id_category_default]=' + category;
    }
    if ((category === undefined) && (tag === undefined)) {
      console.log('No category parameter transmitted, show all products ...');
      return this.url + '/' + 'products?ws_key=' + this.key + '&' + this.url_Addons;
    }
    if (!(tag === undefined)) {
      // Implement when tags if tags are defined
    }
  }

  getDynamicProducts(category, tag, locale, limit): Product[] {
    // Call API here and get Products dynamically, depending on given URL parameters
    console.log('Getting JSON from REST API ...');
    this.result = this.httpClient.get(this.buildUrl(category, tag));
    this.result.subscribe(data => {
      const numberOfProducts = data.products.length;
      for (let index = 0; index < numberOfProducts; index++) {

        const product = <Product>{};

        // Create product with data from API
        product.id = data.products[index].id;
        product.default_image_id = data.products[index].id_default_image;
        product.name = data.products[index].name[0].value;
        product.price = data.products[index].price.substring(0, data.products[index].price.length - 4) + ' €';
        product.availablilty = data.products[index].available_for_order;
        // tslint:disable-next-line:max-line-length
        product.description = data.products[index].description_short[this.getLocaleValue(locale)].value.replace('<p>', '').replace('</p>', '');
        product.forsale = data.products[index].on_sale;
        product.imageurl = this.getProductImage(product.id, product.default_image_id);
        product.link = this.getProductLink(product.id);

        this.productsArray.push(product);
      }

      if (!(limit === undefined)) {
        console.log('Product limit was transmitted, reducing array ...');
        while (this.productsArray.length > limit) {
          this.productsArray.pop();
        }
      }
    }, error => {
      console.log(error);
    });

    this.productsArray = this.productsArray.concat(this.productsArray).concat(this.productsArray);
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

  getLocaleValue(locale): number {
    switch (locale) {
      case 'de_DE':
        console.log('Return code for de_DE language ...');
        return 0;
        break;
      case 'en_US':
        console.log('Return code for en_US language ...');
        return 1;
        break;
      // Will be removed in the future
      case 'fr_FR':
        console.log('Return code for fr_FR language ...');
        return 2;
        break;
      default:
        console.log('Return code for default language ...');
        return 0;
        break;
    }
  }
}
