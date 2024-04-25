import { Component, OnInit } from '@angular/core';
import { 
  FormBuilder, 
  FormGroup, 
  Validators 
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { Product } from './../../models/product.model';

import { ProductService } from './../../services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  public productForm: FormGroup;
  public title!: string;
  public id: string;

  constructor( 
    private _router: Router, 
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _productService: ProductService,
    private _aRoute: ActivatedRoute   
  ) 
  {
    this.productForm = this._fb.group({
      name: ['', Validators.required ],
      category: ['', Validators.required ],
      location: ['', Validators.required ],
      price: ['', Validators.required ],
    });

    this.id = this._aRoute.snapshot.paramMap.get('id') || '';
  }

  ngOnInit() {
    this.editProduct();
  }

  addProduct() {
    
    const product: Product = {
      name: this.productForm.get('name')?.value,
      category: this.productForm.get('category')?.value,
      location: this.productForm.get('location')?.value,
      price: this.productForm.get('price')?.value
    };

    // * Editar Producto
    if( this.id !== null ) {
      this._productService.editProduct( this.id, product ).subscribe( data => {
        this.showSuccessUpdate();
        this.goToHome();
      }, error => {
        console.log( error );
        this.productForm.reset();
      })
      return;
    } else {
      this._productService.saveProduct( product ).subscribe( data => {
        this.showSuccessAdd();
        this.goToHome();
      }, error => {
        console.log( error );
        this.productForm.reset();
      })

      this.title = 'Crear Producto';
    }
  }

  editProduct() {

    if( this.id !== null ) {
      this.title = 'Editar Producto';
      this._productService.obtainProduct( this.id ).subscribe( data => {
        this.productForm.setValue({
          name: data.name,
          category: data.category,
          location: data.location,
          price: data.price
        })
        console.log( data )
      })
    }
  }

  goToHome() {
    this._router.navigate(['/']);
  }

  showSuccessAdd() {
    this._toastr.success('¡¡El producto se agregó correctamente!!', 'Se agregó un producto!', { closeButton: true });
  }

  showSuccessUpdate() {
    this._toastr.info('¡¡El producto se editó correctamente!!', 'Se editó un producto!', { closeButton: true });
  }

}
