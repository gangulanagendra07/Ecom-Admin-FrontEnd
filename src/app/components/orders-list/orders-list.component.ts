import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { Order_Status } from '../../models/order.constants';


@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  ordersStatus: any = Order_Status;
  orders: any = [];
  constructor(private ordersService: OrdersService, private router: Router) { }

  ngOnInit(): void {
    this.GetAllOrders();
  }

  GetAllOrders() {
    this.ordersService.getAllOrders().subscribe(order => {
      this.orders = order;
      // console.log(order);
    })
  }


  DeleteOrder(id: any) {
    console.log(id);
  }
  ShowOrder(id: any) {
    this.router.navigateByUrl(`orders/${id}`);
  }
}
