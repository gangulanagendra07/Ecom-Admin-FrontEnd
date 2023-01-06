import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs/internal/observable/timer';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  editMode: Boolean = false;
  form!: FormGroup;
  categories: any = [];
  imageDisplay!: any;
  productId: any;
  constructor(private fb: FormBuilder, private categoriesService: CategoriesService, private location: Location, private productService: ProductsService, private messageService: MessageService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this._initForm();
    this._checkEditMode();
    this._getCategories();
  }

  private _initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: [''],
      isFeatured: [false]
    })
  }
  onCreate() {

    const productFormData = new FormData();
    Object.keys(this.getFormData).map(key => {
      console.log(key);
      console.log(this.getFormData[key].value)
      productFormData.append(key, this.getFormData[key].value);
    })

    this._addProduct(productFormData);

  }
  OnImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file })
      this.form.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      }
      fileReader.readAsDataURL(file);
      console.log(fileReader);
    }


  }
  private _addProduct(productData: any) {

    if (this.editMode) {
      this.productService.updateProduct(this.productId, productData).subscribe(data => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'product is updated' });
        timer(2000).toPromise().then((done) => {
          this.location.back();
        })
        this.form.reset();
        // console.log(data)
      }, err => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'error', detail: 'product is not updated' });
      })
    } else {
      this.productService.createProduct(productData).subscribe(data => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'product is created' });
        timer(2000).toPromise().then((done) => {
          this.location.back();
        })
        this.form.reset();
        // console.log(data)
      }, err => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'error', detail: 'product is not created' });
      })
    }
  }
  private _getCategories() {
    this.categoriesService.getAllCategories().subscribe(results => {
      // this.categories = results.map((data: any) => data.name);
      this.categories = results;
    })
  }
  get getFormData() {
    return this.form.controls;
  }
  private _checkEditMode() {
    this.route.params.subscribe(param => {
      if (param['id']) {
        this.editMode = true;
        this.productId = param['id'];
        this.productService.getProductById(param['id']).subscribe(product => {
          console.log(product);
          this.form.controls['name'].setValue(product.name);
          this.form.controls['price'].setValue(product.price);
          this.form.controls['brand'].setValue(product.brand);
          this.form.controls['countInStock'].setValue(product.countInStock);
          this.form.controls['description'].setValue(product.description);
          this.form.controls['category'].setValue(product.category.id);
          this.form.controls['richDescription'].setValue(product.richDescription);
          this.form.controls['isFeatured'].setValue(product.isFeatured);
          this.imageDisplay = product.image
          this.form.controls['image'].setValidators([]);
        })
      }
    })
  }
}
