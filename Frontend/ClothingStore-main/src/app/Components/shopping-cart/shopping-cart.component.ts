import { Component, OnInit } from '@angular/core';
import { OrderServiceService } from '../../Services/order-service.service';
import { Cart, OrderItem, SortDirection } from '../../Models/cart';
import { CommonModule, NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import  * as fas  from '@fortawesome/free-solid-svg-icons';  // Add this import
import { OrderitemService } from '../../Services/orderitem.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  imports: [NgIf,CommonModule,FontAwesomeModule,RouterModule],
  templateUrl: './shopping-cart.component.html',
  styles: [`
    .table img {
      transition: transform 0.2s;
    }
    .table img:hover {
      transform: scale(1.1);
    }
    .card-header {
      background: linear-gradient(45deg, #1a1a1a, #2c2c2c);
    }
    .hover-opacity-100:hover {
  opacity: 1 !important;
}
  `]

})
export class ShoppingCartComponent implements OnInit{
  deleteIcon = fas.faTimes;
  leftArrow = fas.faChevronLeft;
  rightArrow = fas.faChevronRight;
  calendarIcon = fas.faCalendar;
  infoIcon = fas.faInfoCircle;
  plusIcon = fas.faPlus;
  minusIcon = fas.faMinus;
  homeIcon = fas.faHome;
  trashIcon = fas.faTrash;
  sortIcon = fas.faSort;
  faBox = fas.faBox;            // for product
faListOl = fas.faListOl;      // for quantity
faMoneyBill = fas.faMoneyBill1;  // for total
  cart: Cart |null=null;
  error: string | null = null;

constructor(private service:OrderServiceService,private orderitemserves:OrderitemService){}
ngOnInit(): void {
  this.loaditems();
  console.log(this.cart);
}

sort:SortDirection=SortDirection.None;
sortByProduct(){
if(this.sort!=SortDirection.Product)
{
    this.cart!.orderItems=[...this.cart?.orderItems.sort((a,b)=> a.id -b.id) || []];
    this.sort=SortDirection.Product
}
else
{
  this.cart!.orderItems=[...this.cart?.orderItems.sort((a,b)=> b.id -a.id) || []];
  this.sort=SortDirection.None;
}
}
sortByQuantity(){
  if(this.sort!=SortDirection.Quantity)
    {
      this.cart!.orderItems = [...(this.cart?.orderItems?.sort((a, b) => a.quantity - b.quantity) || [])];
      this.sort=SortDirection.Quantity
    }
    else
    {
      this.cart!.orderItems = [...(this.cart?.orderItems?.sort((a, b) => b.quantity - a.quantity) || [])];
      this.sort=SortDirection.None;
    }
}
sortByTotal(){
  if(this.sort!=SortDirection.Total)
    {
      this.cart!.orderItems =[...this.cart?.orderItems.sort((a,b)=> {return (a.price * a.quantity) - (b.price * b.quantity)}) ||[]]
 
      this.sort=SortDirection.Total
    }
    else
    {
      this.cart!.orderItems =[...this.cart?.orderItems.sort((a,b)=> {return (b.price * b.quantity) - (a.price * a.quantity)})||[]]
 
      this.sort=SortDirection.None;
      
    }
}

deleteItem(id:number)
{
  this.error=null;
  if (this.cart) {
    this.cart.orderItems = this.cart.orderItems.filter(item => item.id !== id);
    this.cart.totalAmount = this.cart.orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  this.orderitemserves.deleteitem(id).subscribe({
    next: (response) => {
      console.log('Item deleted successfully', response);
    },
    error: (err) => {
      this.error = 'An error occurred while deleting the item.';
      console.error('Error deleting item:', err);
    }
  });
 
}


increaseQuantity(item: OrderItem): void {
  this.error=null;
  this.orderitemserves.increase(item.id).subscribe({
    next: (updatedcart) => {
      // this.cart=updatedcart
      item.quantity++;
      console.log('Item quantity increased successfully', updatedcart);
    },
    error: (err) => {
 

      this.error = `Maximum quantity of the product ${item.name} reached.`;
      console.error('Error increasing item:', err);
    }
  })
  
}

decreaseQuantity(item: OrderItem): void {
  this.error=null;
  if(item.quantity>1){
  this.orderitemserves.decrease(item.id).subscribe({
    next: (updatedcart) => {
      // this.cart=updatedcart
      item.quantity--;
      console.log('Item quantity decreased successfully', updatedcart);
    },
    error: (err) => {
 
      
      this.error = 'An error occurred while decreasing the item.';
      console.error('Error decreasing item:', err);
    }
  })
}
}

clearCart(){
  if (confirm('Are you sure you want to clear your cart?')) {
    this.service.clear().subscribe(
      {
        next: (clearedcart:Cart) => {
          this.cart=clearedcart
          console.log('Item quantity decreased successfully', clearedcart);
        },
        error: (err) => {
     
          
          this.error = 'An error occurred while clearing the cart.';
          console.error('Error decreasing item:', err);
        }
      }
      
    )
  }
}


loaditems()
{
  this.error=null;
  this.service.getCart().subscribe({
    next:(data) => {
      this.cart=data;
      console.log(this.cart);
      this.error = null;
    },
    error:(err)=>{
      if (err.status === 404) {
        this.error = 'Cart not found';
      } else {
        this.error = 'An error occurred while fetching the cart';
        console.log(err);
      }
      this.cart = null;
      console.error('Error fetching cart:', err);
    }
    
  }
  )
}
}
