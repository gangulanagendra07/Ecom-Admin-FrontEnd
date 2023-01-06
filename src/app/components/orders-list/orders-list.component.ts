import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { OrdersService } from 'src/app/services/orders.service';
import { Order_Status } from '../../models/order.constants';


@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit, OnDestroy {

  endSub$: Subject<any> = new Subject()
  ordersStatus: any = Order_Status;
  orders: any = [];
  constructor(private ordersService: OrdersService, private router: Router) { }

  ngOnInit(): void {
    this.GetAllOrders();
  };
  ngOnDestroy(): void {
    this.endSub$.complete()
  }

  GetAllOrders() {
    this.ordersService.getAllOrders().pipe(takeUntil(this.endSub$)).subscribe(order => {
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
