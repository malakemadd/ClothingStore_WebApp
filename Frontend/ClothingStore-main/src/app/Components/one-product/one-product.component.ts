import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { product } from '../../Models/product';
import { WishlistService } from '../../Services/wishlist.service';
import { ProductsService } from '../../Services/products.service';
import { CartService } from '../../Services/cart.service';
import { AddToCart } from '../../Models/AddToCart';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../Services/alert.service';

@Component({
  selector: 'app-one-product',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './one-product.component.html',
  styleUrl: './one-product.component.css'
})
export class OneProductComponent implements OnInit {
  @Input({ required: true }) prodData!: product;
  userWishList: any[] = [];
  isInWishList: boolean = false;

  //ProdToBeAddedToWishlist:AddToCart|null=null;
  // ProdToBeAddedToWishlist: AddToCart = { ProdId: this.prodData.code, quantity: 0 };



  constructor(private wishListService: WishlistService, private productService:ProductsService,private router: Router, private cartService:CartService,private alertService:AlertService) {}

  ngOnInit(): void {
    this.wishListService.getWishlist().subscribe({
      next: (data) => {
        this.userWishList = data;
        this.isInWishList = this.userWishList.includes(this.prodData.code);
      },
      error: (err) => console.log(err)
    });
  }
  isInStock: boolean =true;

  addToWishList(ProdId: number) {
    if (this.isInWishList) {
      this.wishListService.removeFromWishlist(ProdId).subscribe({
        next: () => {
          this.isInWishList = false;
          console.log('Product removed from wishlist');
          //this.alertService.showAlert('Product removed from wishlist', 'success');
        },
        error: (err) => console.log(err)
      });
    }
    else {
      this.wishListService.addToWishlist(ProdId).subscribe({
        next: () => {
          this.isInWishList = true;
          this.alertService.showAlert('Product added to wishlist', 'success');
          console.log('Product added to wishlist');

        },
        error: (err) => console.log(err)
      });
    }
  }


  AddToCart(prodId:number, quantity:number){
    const cartItem: AddToCart={ProductId:prodId, quantity:quantity};
    this.cartService.AddToCart(cartItem).subscribe({
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



  // ProductDetails(code: number) {
  //   this.productService.getProdById(code).subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       this.router.navigate(['/productDetails', code]);
  //     },
  //     error: (err) => console.log(err)
  //   });
  // }

  // navigate

}
