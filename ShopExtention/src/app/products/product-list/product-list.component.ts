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

  products: Product[];
  category: string;
  tag: string;
  locale: string;

  constructor(private ps: ProductServiceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.category = params['category'];
      console.log(this.category);
      this.tag = params['tag'];
      console.log(this.tag);
      this.locale = params['locale'];
      console.log(this.locale);
    });

    this.products = this.ps.getDynamicProducts(this.category, this.tag, this.locale);
  }

}
