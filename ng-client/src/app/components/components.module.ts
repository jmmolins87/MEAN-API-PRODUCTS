import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';


import { CreateProductComponent } from './create-product/create-product.component';
import { ListProductComponent } from './list-product/list-product.component';

import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    CreateProductComponent,
    ListProductComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    ToastrModule.forRoot()
  ],
  exports: [
    CreateProductComponent,
    ListProductComponent
  ]
})
export class ComponentsModule { }
