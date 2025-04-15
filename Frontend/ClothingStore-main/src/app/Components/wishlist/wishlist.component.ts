// filepath: d:\ITI_Content\Angular\Angular_Project\ClothingStore\src\app\wishlist\wishlist.component.ts
import { Component, Injectable, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WishlistService } from '../../Services/wishlist.service';
import { ProductsService } from '../../Services/products.service';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../Services/cart.service';
import { AddToCart } from '../../Models/AddToCart';
import { AlertService } from '../../Services/alert.service';
// import { WishlistService } from '../Services/wishlist.service';

// @Injectable({
//   providedIn: 'root'
// })

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})


export class WishlistComponent implements OnInit {
  wishlistItemsIds: number[] = [];

  wishlistItems: any[] = [];

  
  constructor(private wishlistService: WishlistService, private route:ActivatedRoute, private productService:ProductsService,private cartservice:CartService,private alertService:AlertService) {}



loadwishlist(){
  this.wishlistItems = [];
  this.wishlistItemsIds = [];
  this.route.params.subscribe(params => {
    const userId = params['userId'];
    console.log('UserId:', userId);
  this.wishlistService.getWishlist().subscribe({
    next: (data) => {
      console.log('Received wishlist data:', data);
      this.wishlistItemsIds = data;
      console.log('WishlistItemsIds:', this.wishlistItemsIds);

      if (this.wishlistItemsIds && this.wishlistItemsIds.length > 0) {
        this.wishlistItemsIds.forEach(productId => {
          this.productService.getProdById(productId).subscribe({
            next: (productData) => {
              console.log('Received product data:', productData);
              this.wishlistItems.push(productData);
            },
            error: (err) => console.log('Error fetching product:', err)
          });
        });
      } else {
        console.log('No items in wishlist');
      }
    },
    error: (err) => console.log('Error fetching wishlist:', err)
  });
});
}

ngOnInit(): void {
  this.loadwishlist();

}


AddToCart(code:number){
{
    const cartItem: AddToCart={ProductId:code, quantity:1};
    this.cartservice.AddToCart(cartItem).subscribe({
      next: (data) => {
        console.log('Added to cart successfully:', data);
        this.alertService.showAlert('Product added to cart', 'success');
    },


    error: (err) => {
      console.error('Error adding to cart:', err);
      if (err.status === 400) {
        this.alertService.showAlert('No enough stock available', 'error');
      } else if (err.status === 200) {

        this.alertService.showAlert('Product added to cart', 'success');
      } else {
        this.alertService.showAlert('Error adding item to cart', 'error');
      }
  }
    })
  }
}


 removeFromWishlist(id: number) {
  console.log('Removing wishlist item with id:', id);
  this.wishlistService.removeFromWishlist(id).subscribe({
    next: () => {

      // this.wishlistItems = this.wishlistItems.filter(item => item.id !== id);
      // this.wishlistItemsIds=this.wishlistItemsIds.filter(item=>item!==id);

      this.loadwishlist();

      console.log('Wishlist updated:', this.wishlistItems);
    },
    error: (error) => {
      console.error('Error while removing item:', error);
    }
  });
}
}