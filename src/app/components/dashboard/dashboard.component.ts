import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  statistics: any = [];
  constructor(private orderService: OrdersService, private usersService: UsersService, private productService: ProductsService) { }

  ngOnInit(): void {
    combineLatest([
      this.orderService.getCount(),
      this.productService.getProductsCount(),
      this.usersService.getUsersCount(),
      this.orderService.getTotalSales()
    ]).subscribe(values => {
      this.statistics = values;
      console.log(values);
    })
  }

}
