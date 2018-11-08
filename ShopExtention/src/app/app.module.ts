import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductServiceService } from './products/shared/product-service.service';
import { ProductComponent } from './products/product/product.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ProductServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
