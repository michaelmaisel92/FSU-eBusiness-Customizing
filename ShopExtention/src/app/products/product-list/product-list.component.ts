import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { ProductServiceService } from '../shared/product-service.service';
import { Product } from '../shared/product.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  category: string;
  tag: string;
  locale: string;
  limit: number;

  horizontal: boolean;
  vertical: boolean;

  numberOfProducts: number;
  showbuttons: boolean = true;

  constructor(private ps: ProductServiceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {

      // params for getDynamicProducts
      this.category = params['category'];
      console.log('Category: ' + this.category + ' ...');
      this.tag = params['tag'];
      console.log('Tag: ' + this.tag + ' ...');
      this.locale = params['locale'];
      console.log('Locale: ' + this.locale + ' ...');
      this.limit = params['limit'];
      console.log('Limit: ' + this.limit + ' ...')
      
      // params for defining the applications look
      this.vertical = params ['vertical'];
      this.horizontal = params ['horizontal'];
    });

    this.products = this.ps.getDynamicProducts(this.category, this.tag, this.locale, this.limit);
    this.numberOfProducts = this.ps.getNumberOfDynamicsProducts(this.category, this.tag);

    console.log('Products array contains ' + this.products.length + ' products ...')
    if (this.products.length <= 1) {
      this.showbuttons = false;
    }

  }

  scrollByLeft() {
    document.getElementById("scrollme").scrollBy(320, 0);
  }

  scrollByRight() {
    document.getElementById("scrollme").scrollBy(-320, 0);
  }

  getNumberofItems() :number {
    return this.products.length;
  }
}
