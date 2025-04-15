import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderServiceService } from '../../Services/order-service.service';
import { expandableOrders, Orders, PaymentMethod, SortDirection } from '../../Models/cart';
import *as fas from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { faStripe } from '@fortawesome/free-brands-svg-icons';



@Component({
  selector: 'app-orders',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './orders.component.html',
  animations: [
    trigger('expandCollapse', [
      state('void', style({ height: '0px', opacity: 0 })),
      state('*', style({ height: '*', opacity: 1 })),
      transition('void <=> *', animate('300ms ease-in-out'))
    ])
  ],
  standalone: true
})
export class OrdersComponent implements OnInit{
 
  UserOrders : expandableOrders = [];
 
  error: string | null = null;
  constructor(private orderservice:OrderServiceService) {
    
  }
  faBox = fas.faBox;  // for items
faCalendar = fas.faCalendarDays;  // for date
faHashtag = fas.faHashtag;  // for order ID
faDollar = fas.faDollarSign;  // for amount
  faChevronDown = fas.faChevronDown;
    faChevronUp = fas.faChevronUp;
    sortIcon = fas.faSort;
    faLocationDot = fas.faLocationDot;
  faCreditCard = fas.faCreditCard;
  PaymentMethod = PaymentMethod;
  faTruck = fas.faTruck;
  faStripe = faStripe;
    // faBox = fas.faBox;
faListOl = fas.faListOl;
faMoneyBill = fas.faMoneyBill1;
// faDollar = fas.faDollarSign;
  ngOnInit(): void {
    this.orderservice.getOrders().subscribe(
      {
        next: (data)=> {this.UserOrders=data; console.log(this.UserOrders)},
        error:(err) =>       {this.error = `An error occured`;
       }
      }
    )
  }

  
  getTotalAmount(): number {
    return this.UserOrders.reduce((total, order) => total + order.totalAmount, 0);
}

sort:SortDirection=SortDirection.None;
sortByDate(){
  if(this.sort!=SortDirection.Date)
    {
      this.UserOrders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
      this.sort=SortDirection.Date
    }
    else
    {
      this.UserOrders=[...this.UserOrders?.sort((a,b)=> new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()) ];
      this.sort=SortDirection.None;
    }
}
sortById(){
  if(this.sort!=SortDirection.Product)
    {
        this.UserOrders=[...this.UserOrders?.sort((a,b)=> b.id -a.id) ];
        this.sort=SortDirection.Product
    }
    else
    {
      this.UserOrders=[...this.UserOrders?.sort((a,b)=> a.id -b.id) ];
      this.sort=SortDirection.None;
    }
}
sortByItems(){
  if(this.sort!=SortDirection.Quantity)
    {
        this.UserOrders=[...this.UserOrders?.sort((a,b)=> b.orderItems.length -a.orderItems.length) ];
        this.sort=SortDirection.Quantity
    }
    else
    {
      this.UserOrders=[...this.UserOrders?.sort((a,b)=> a.orderItems.length -b.orderItems.length) ];
      this.sort=SortDirection.None;
    }
}
sortByAmount(){
  if(this.sort!=SortDirection.Total)
    {
        this.UserOrders=[...this.UserOrders?.sort((a,b)=> b.orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0) -a.orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)) ];
        this.sort=SortDirection.Total
    }
    else
    {
      this.UserOrders=[...this.UserOrders?.sort((a,b)=> a.orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0) -b.orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)) ];
      this.sort=SortDirection.None;
    }
}
}
