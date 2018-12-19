import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './products/product-list/product-list.component';

const routes: Routes = [

  {
    path: 'products',
    component:
    ProductListComponent,
    data: {
      horizontal: 'true',
    }
  },
  { path: '', component: ProductListComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
