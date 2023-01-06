import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { OrdersService } from 'src/app/services/orders.service';
import { Order_Status } from '../../models/order.constants';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.scss']
})
export class OrdersDetailsComponent implements OnInit, OnDestroy {

  endSub$: Subject<any> = new Subject();
  order: any;
  selectedStatus: any;
  orderStatus: any = [];
  orderId: any;
  constructor(private route: ActivatedRoute, private orderService: OrdersService, private messageService: MessageService) { }

  ngOnInit(): void {
    this._mapOrderDetails();
    this._getOrder();
  }
  ngOnDestroy(): void {
    this.endSub$.complete();
  }

  private _getOrder() {
    this.route.params.subscribe(param => {
      if (param['id']) {
        this.orderId = param['id'];
        this.orderService.getOrder(param['id']).pipe(takeUntil(this.endSub$)).subscribe(orderRes => {
          this.order = orderRes;
          this.selectedStatus = orderRes.status;
          // console.log(orderRes);
        })
      }
    })
  }
  private _mapOrderDetails() {
    this.orderStatus = Object.keys(Order_Status).map(key => {
      return {
        id: key,
        name: Order_Status[key].label
      }
    })
  }
  onStatusChange(event: any) {
    let body = {
      status: event.value
    }
    this.orderService.updateOrder(this.orderId, body).pipe(takeUntil(this.endSub$)).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `Status changed to ${Order_Status[data.status].label}` });
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'error', detail: 'Failed to change the status' });
    })
  }

}
