import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../shared/product-service.service';
import { Product } from '../shared/product.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];

  result:Observable<any>;

  constructor(private ps: ProductServiceService, private http : HttpClient) { }


  //URL
  url = "http://prestashopa.netglue.de/api";
  key = "LL11XQ47LUKNVVLQ3MY31UUW4UATBE4Q";
  url_Addons = "output_format=JSON&display=full";

  //Requests
  categorie = "categories";
  product = "products";

  //Array Buffer
  bufferProduct: any = [];
  bufferCategory = [];
  

  buildUrl(type){
    return this.url + '/' + type + '?ws_key=' + this.key+ '&'+ this.url_Addons;
  } 

  getRequest(type){
    this.result = this.http.get(this.buildUrl(type));
      this.result.subscribe( data => {
        console.log( data );
        this.bufferProduct =  data ;
        if (type == this.product) { 
          console.log("Name: "+data.products[0].name[0].value);
          console.log("Price: "+data.products[0].price);
          console.log("Available: "+data.products[0].available_for_order);
          console.log("Description: "+data.products[0].description_short[0].value);
          console.log("Sale: "+data.products[0].on_sale);
        } else {
          console.log(data.categories[0].name[0].value); 
        }
      }, error => {
        console.log( error );
      })
  }

  ngOnInit() {
    this.products = this.ps.getStaticProducts();
    this.getRequest(this.product);
  }

}
