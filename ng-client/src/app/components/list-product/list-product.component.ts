import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  public products: Product[] = [];

  constructor( 
    private _router: Router, 
    private _productService: ProductService,
    private _toastr: ToastrService 
  ) {}

  ngOnInit() {
    this.obtainProducts();
  }

  goToCreate() {
    this._router.navigate(['/crear-producto']);
  }

  obtainProducts() {
    this._productService.getProducts().subscribe( data => {
      this.products = data;
    }, error => {
      console.log( error );
    })
  }

  deleteProduct( id: any ) {
    this._productService.deleteProduct( id ).subscribe( data => {
      this.showDelete();
      this.obtainProducts();
    }, error => {
      console.log( error )
    })
  }

  showDelete() {
    this._toastr.error('Producto eliminado', 'El producto fue eliminado correctamente',{
      closeButton: true
    });
  }

  goToEdit( id: any ) {
    this._router.navigate([`/editar-producto/:${ id }`]);
  }
}
