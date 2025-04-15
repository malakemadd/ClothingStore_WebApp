import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../Services/products.service';
import { category } from '../../Models/category';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories:category[]=[];

  constructor(private router: Router, private productService:ProductsService) {}

  ngOnInit(): void {
    this.productService.getCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.log(err)    
    })
  }

  navigateToShop(categoryId: number) {
    this.router.navigate(['/products'], { 
      queryParams: { category: categoryId }
    });

  }
}