import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { OneProductComponent } from "../one-product/one-product.component";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { products, Size, Color, product, category, subcategory } from '../../Models/product';
import { WishlistService } from '../../Services/wishlist.service';
import { CartService } from '../../Services/cart.service';
import { from, skip, take, toArray } from 'rxjs';

@Component({
  selector: 'app-products',
  imports: [OneProductComponent, RouterModule, CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  constructor(private myService: ProductsService, private route:ActivatedRoute) { }

  SizeEnum = Size;
  ColorEnum = Color;
  Categories: category[] = [];
  MatchedSubCategories: subcategory[] = [];
  products: product[] = [];
  filteredProducts: product[] = [];
  
  selectedSizes: number[] = [];
  selectedColors: number[] = [];
  selectedMinPrice: number | null = null;
  selectedMaxPrice: number | null = null;
  selectedCategory: number | null = null;
  selectedSubCategories: number[] = [];
  pageSize: number=12;
  pageNum: number=1;
  totalPages: number=0;
  paginatedProducts: product[] = [];
  IsInStock: boolean | null = null;
  currentSort: string = 'featured';
  toggleStockFilter() {
    this.IsInStock = !this.IsInStock;
    this.filterProducts();
}

  expandedSections = {
    category: true,
    subcategory: true,
    size: true,
    color: true,
    priceRange: true
  };

  ngOnInit(): void {

    this.route.queryParams.subscribe(params=>{
      if(params['category']){
       this.selectedCategory=Number(params['category']); 
      }
    });


    this.myService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.filterProducts();
      },
      error: (err) => console.log(err)
    });

    this.myService.getCategories().subscribe({
      next: (data) => this.Categories = data,
      error: (err) => console.log(err)
    });
  }

  toggleSection(section: keyof typeof this.expandedSections) {
    this.expandedSections[section] = !this.expandedSections[section];
  }

  toggleSize(size: number) {
    const index = this.selectedSizes.indexOf(size);
    if (index === -1) {
        this.selectedSizes.push(size);
    } else {
        this.selectedSizes.splice(index, 1);
    }
    this.filterProducts();
  }

  toggleColor(color: number) {
    const index = this.selectedColors.indexOf(color);
    if (index === -1) {
        this.selectedColors.push(color);
    } else {
        this.selectedColors.splice(index, 1);
    }
    this.filterProducts();
  }

  toggleCategory(category: category) {
    //lw kant category already selected w hwa das 3leha fa hyt3mlha deselect
    if (this.selectedCategory === category.id) {
        this.selectedCategory = null;
        this.selectedSubCategories = [];
        this.MatchedSubCategories = [];
    }
    else {
        this.selectedCategory = category.id;
        this.selectedSubCategories = [];
        this.myService.getSubCategoriesByCategory(category.id).subscribe({
            next: (data) => {
                this.MatchedSubCategories = data;
                console.log('Loaded subcategories:', this.MatchedSubCategories);
            },
            error: (err) => console.log(err)
        });
    }
    this.filterProducts();
  }

  toggleSubCategory(subCategoryId: number) {
    const index = this.selectedSubCategories.indexOf(subCategoryId);
    if (index === -1) {
      this.selectedSubCategories.push(subCategoryId);
    } else {
      this.selectedSubCategories.splice(index, 1);
    }
    this.filterProducts();
  }

  sortProducts(sortOption: string) {
    this.currentSort = sortOption;
    switch (sortOption) {
      case 'price-low-high':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        this.ApplyPagination();
        console.log("entered low to high")
        break;
      case 'price-high-low':
        console.log("entered high to low")

        this.filteredProducts.sort((a, b) => b.price - a.price);
        this.ApplyPagination();
        break;
      default:
        console.log("didnt enter")

        this.filterProducts();
        break;
    }
  }

  filterProducts() {


    this.filteredProducts = this.products.filter(product => {


      const sizeMatch = this.selectedSizes.length === 0 || 
        this.selectedSizes.includes(product.size);

      const colorMatch = this.selectedColors.length === 0 || 
        this.selectedColors.includes(product.color);
      
      const priceMatch = (
        (this.selectedMinPrice === null || product.price >= this.selectedMinPrice) &&
        (this.selectedMaxPrice === null || product.price <= this.selectedMaxPrice)
      );

      const categoryMatch = this.selectedCategory === null || 
        product.categoryid === this.selectedCategory;

      const subcategoryMatch = this.selectedSubCategories.length === 0 || 
        this.selectedSubCategories.includes(product.subcategoryid);
        const stockMatch= !this.IsInStock || product.stock>0;

      
      return sizeMatch && colorMatch && priceMatch && categoryMatch && subcategoryMatch&&stockMatch;
    });
    if (this.currentSort !== 'featured') {
      this.sortProducts(this.currentSort);
    }
    this.totalPages=Math.ceil(this.filteredProducts.length/this.pageSize);
    this.ApplyPagination();
  }
  ApplyPagination() {
    from(this.filteredProducts).pipe(
      skip((this.pageNum - 1) * this.pageSize),
      take(this.pageSize),
      toArray()
    ).subscribe({
      next: (products) => {

        this.paginatedProducts=products;
      },
    });
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.pageNum = page;

      this.ApplyPagination();
    }
  }

  getPaginationArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
  getEnumValues(enumObj: any): number[] {
  return Object.values(enumObj).filter(value => typeof value === 'number') as number[];
  }



//btgeb kol pair fel enum, ta5od el value bs(number)
//da 34n tt3aml m3hom ka numbers





}

