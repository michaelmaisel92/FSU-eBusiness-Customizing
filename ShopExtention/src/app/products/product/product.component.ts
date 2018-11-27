import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../shared/product.interface';
import { ProductServiceService } from '../shared/product-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;

  constructor() { }

  ngOnInit() {
  }

}
