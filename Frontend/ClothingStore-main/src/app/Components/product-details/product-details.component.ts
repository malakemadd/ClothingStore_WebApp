import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../Services/user.service';
// import { UserService } from '../../../Services/user.service';
import { Review, Reviews ,ReviewPost, product,AddToCartRequest} from '../../Models/review';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import  * as fas  from '@fortawesome/free-solid-svg-icons';  // Add this import
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {  ToastrService } from 'ngx-toastr'; // Import ToastrModule
import { Color, Size } from '../../Models/product';
import { ProductsComponent } from '../products/products.component';



@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule,FontAwesomeModule,ProductsComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})


export class ProductDetailsComponent implements OnInit {
  size=Size;
color=Color;
  getEnumValues(enumObj: any): number[] {
    return Object.values(enumObj).filter(value => typeof value === 'number') as number[];
  }
  
  getEnumKey(value: number): string {
    return Object.keys(Size).find(key => Size[key as keyof typeof Size] === value) || '';
  }
  getEnumKeycolor(value: number): string {
    return Object.keys(Color).find(key => Size[key as keyof typeof Size] === value) || '';
  }
  getColorValue(value: number): string {
    const colorMap: { [key: number]: string } = {
      [Color.Black]: "black",
      [Color.Blue]: "blue",
      [Color.Green]: "green",
      [Color.Red]: "red",
      [Color.Grey]: "grey",
      [Color.Yellow]: "yellow",
      [Color.White]: "white"
    };
    return colorMap[value] || "transparent"; // Fallback if not found
  }

constructor( private servise:UserService ,private route:ActivatedRoute) { } // Inject the ActivatedRoute service
   
private toastr = inject(ToastrService);


// reviwes2:Reviews| null=null;
reviwes2: Review[] = [];
newReview: ReviewPost = { productId: 1, comment: '', rating: 5 };

addToCart: AddToCartRequest = { productId: 1, quantity: 1 };

// product = {
//   name: 'Classic T-shirt',
//   code: 1,
//   description: 'A classic t-shirt made from 100% cotton. Comfortable and stylish.',
//   price: 59.99,
//   imageUrl: 'assets/images/products/1.jpg'
// };

product: product | null = null; // Initialize as null

plusIcon = fas.faPlus;
  minusIcon = fas.faMinus;
 selectedImage: string = ''
  quantity:number = 1; // Initialize quantity to 1
   selected:string=""
   src1:string="https://media.istockphoto.com/id/1178258280/fi/valokuva/valkoinen-t-paita-n%C3%A4kym%C3%A4-edest%C3%A4.jpg?s=612x612&w=0&k=20&c=eMcUaYo3pcRipJzm4dSwT7kGWLMK4D1c7s1vzWJ_xe4=";
   src2:string="https://media.istockphoto.com/id/1302815072/fi/valokuva/tyhj%C3%A4-musta-tshirt-nuorten-mies-malli-valkoisella-taustalla.jpg?s=612x612&w=0&k=20&c=rY-juBu6wdIY7eY7tGOcm87iqLm7zqHC2QdAguY-xtU=";
   src3:string="https://media.istockphoto.com/id/858160872/fi/valokuva/hipster-komea-miesmalli-parralla-yll%C3%A4%C3%A4n-musta-tyhj%C3%A4-baseball-lippis-jossa-on-tilaa-logollesi.jpg?s=612x612&w=0&k=20&c=Nq-58pfs9Ek3jJdXdtXFvX2FPl28YOHzZs-n4GPaPnY=";
   src4:string="https://media.istockphoto.com/id/1302815072/fi/valokuva/tyhj%C3%A4-musta-tshirt-nuorten-mies-malli-valkoisella-taustalla.jpg?s=612x612&w=0&k=20&c=rY-juBu6wdIY7eY7tGOcm87iqLm7zqHC2QdAguY-xtU=";
ngOnInit(): void {
  const code = +this.route.snapshot.paramMap.get('id')!; // Assuming the parameter is defined as 'id'
    this.servise.getreviewsByid(code).subscribe({next: (data) => {
        
      this.reviwes2 = data;
console.log(this.reviwes2); // Debugging line to check the data received

    }, error: (err) => { console.log(err); }});



    this.newReview.productId=code;
    this.getproductsbyid(code);
   
    

}




addReview(): void {
    console.log('Add Review called', this.newReview); // Debugging line

  this.servise.addReview(this.newReview).subscribe({
    next: (review) => {
    //   this.reviwes2.push(review);  // Push the returned review, not newReview
       this.newReview.comment = '';  // Clear the comment
       this.newReview.rating = 5;    // Reset the rating to default (5)
       this.reviwes2=review;
    },
    error: (err) => {
      console.log('Error adding review:', err);  // Log any errors
    }
  });
}

deleteReview(reviewId: number): void {
  this.servise.deleteReview(reviewId).subscribe({
    next: () => {
      // Remove the review from the local array
      this.reviwes2 = this.reviwes2.filter(review => review.id !== reviewId);
    },
    error: (err) => {
      console.log('Error deleting review:', err);  // Log any errors
    }
  });
}

  

// selectedImage: string = '';

    selectImage(h:number,image: string) {
        switch(h)
        {
          case 1:
            this.src1=this.selectedImage;
            break;
            case 2:
            this.src2=this.selectedImage;
            break;
            case 3:
            this.src3=this.selectedImage;
            break;
            case 4:
            this.src4=this.selectedImage;
            break;
        }
        this.selectedImage = image;
    }

getproductsbyid(code :number):void 
{
    
this.servise.getproductsbyid(code).subscribe({next: (data) => { 
  this.product = data; // Assign the received product to the component property
  if(this.product?.images[0] !=undefined){
    this.src1="/Images/"+this.product?.images?.[0];
    }
    if(this.product?.images[1] !=undefined){
      this.src2="/Images/"+this.product?.images?.[1];
      }
      if(this.product?.images[2] !=undefined){
        this.src3="/Images/"+this.product?.images?.[2];
        }
        if(this.product?.images[3] !=undefined){
          this.src4="/Images/"+this.product?.images?.[3];
          }
          this.selectedImage="/Images/"+this.product?.imageUrl;
},
error: (err) => {
  console.error('Error in getProductsById:', err);
}
});
 
}







AddToCart(productId: number, quantity: number): void {
  this.servise.AddToCart(productId, quantity).subscribe({
    next: (data) => {
      this.toastr.success('Added to cart successfully', 'Success'); // ✅ Working now!
      console.log('Product added to cart:', data);
      this.quantity=1;
    },
    error: (err) => {
      console.error('Error adding product to cart:', err); 
      this.toastr.error('No Stock', 'Error'); // ✅ Working now!
    }
  });
}




decreaseQuantity(): void {
  if (this.quantity > 1) {
    this.quantity--;
  }


}


increaseQuantity(): void {

  if(this.quantity<=this.product!.stock)
  {
  this.quantity++;
  console.log(this.product?.stock)
  console.log(this.quantity)
  }
}}

