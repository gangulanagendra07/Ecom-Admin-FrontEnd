import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  products: any = [];
  constructor(private productService: ProductsService, private router: Router, private messageService: MessageService, private location: Location) { }

  ngOnInit(): void {
    this.GetAllProducts();
  }

  GetAllProducts() {
    this.productService.getAllProducts().subscribe(results => {
      console.log(results);
      this.products = results;
    })
  }
  DeleteProduct(id: any) {
    this.productService.deleteProduct(id).subscribe(results => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: results.message });
      window.location.reload();
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'error', detail: 'category is not deleted' });
    })
  }

  UpadteProduct(id: any) {
    this.router.navigateByUrl(`/products/form/${id}`);
  }
}
