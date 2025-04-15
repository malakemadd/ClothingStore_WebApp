import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../Services/dashboard.service';
// import { DashboardService } from '../services/dashboard.service'; // Import the service

@Component({
  selector: 'app-dash-board',
  imports: [CommonModule],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})
export class DashBoardComponent implements AfterViewInit {
  userCount: number = 0;
  productCount: number = 0;
  categoryCount: number = 0;
  orderCount: number = 0;
  revenue: number = 0;
  chart: any;
  @ViewChild('userChartCanvas', { static: false }) userChartCanvas!: ElementRef;
 @ViewChild('productChartCanvas', { static: false }) productChartCanvas!: ElementRef;
 @ViewChild('CategoriesChartCanvas', { static: false }) CategoriesChartCanvas!: ElementRef;

  
  statistics = [
    { title: 'Total Customers', value: this.userCount, icon: 'users' },
    { title: 'Orders Placed', value: this.orderCount, icon: 'shopping-cart' },
    { title: 'Total Products', value: this.productCount, icon: 'box' },
    { title: 'Total Revenue', value: this.revenue, icon: 'dollar-sign' },
    { title: 'Total Categories', value: this.categoryCount, icon: 'tags' },
  ];
  
  constructor(private dashboardService: DashboardService) {} 

  ngAfterViewInit() {
     this.fetchUserStats();
     this.fetchProductStats();
     this.fetchCategoryProductStats();   
     this.fetchProductOrderStats();
     this.fetchOrderStats();
    this.fetchCategoriesStats();

  }

  fetchUserStats() {
    this.dashboardService.getAllUsers().subscribe({
      next:(response)=>
      {
           this.userCount = response.length;
     this.statistics[0].value = this.userCount; 

      }
    })
  
  }

  userChart() {
    

    new Chart(this.userChartCanvas.nativeElement, {
      type: 'pie', 
      data: {
        labels: ['Total Users'],
        datasets: [{
          label: 'User Count',
          data: [this.userCount],
          backgroundColor: ['rgba(54, 162, 235, 0.6)'],
          borderColor: ['rgba(54, 162, 235, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, //manual sizing
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        }
      }
    });
  } 
  createProductChart() {
    

    new Chart(this.productChartCanvas.nativeElement, {
      type: 'bar', 
      data: {
        labels: ['Total Products'],
        datasets: [{
          label: 'Product Count',
          data: [this.productCount],
          backgroundColor: ['rgba(255, 99, 132, 0.6)'],
          borderColor: ['rgba(255, 99, 132, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        }
      }
    });
  }

  fetchProductStats() {
    this.dashboardService.getAllProducts().subscribe({
      next:(response)=>
      {
        if (response && Array.isArray(response)) {
              this.productCount = response.length;
              console.log("Product Count:", this.productCount); 
              this.statistics[2].value = this.productCount;
             // this.createProductChart();
            } else {
              console.error("Invalid response format", response);
            }
          },
      });

    // this.dashboardService.getAllProducts().subscribe(response => {
    //   console.log("API Response:", response); 
  
    //   if (response && Array.isArray(response)) {
    //     this.productCount = response.length;
    //     console.log("Product Count:", this.productCount); 
    //     this.statistics[2].value = this.productCount;
    //    // this.createProductChart();
    //   } else {
    //     console.error("Invalid response format", response);
    //   }
    // }, error => {
    //   console.error("API Error:", error);
    // });
  }

 fetchCategoriesStats() {
  this.dashboardService.getAllCategories().subscribe({
    next:(response) => {
      if (response && Array.isArray(response)) {
            this.categoryCount = response.length;
            console.log("Category Count:", this.categoryCount); 
            this.statistics[4].value = this.categoryCount; 
           // this.createCategoriesChart(); 
          } else {
            console.error("Invalid response format for categories", response);
          }
        },
    });


    // this.dashboardService.getAllCategories().subscribe(response => {
    //   console.log("API Response (Categories):", response);
  
    //   if (response && Array.isArray(response)) {
    //     this.categoryCount = response.length;
    //     console.log("Category Count:", this.categoryCount); 
    //     this.statistics[4].value = this.categoryCount; 
    //    // this.createCategoriesChart(); 
    //   } else {
    //     console.error("Invalid response format for categories", response);
    //   }
    // }, error => {
    //   console.error("API Error (Categories):", error);
    // });
 }


  // createCategoryProductChart(categoryNames: string[], productCounts: number[]) {
  //   new Chart(this.CategoriesChartCanvas.nativeElement, {
  //     type: 'bar',
  //     data: {
  //       labels: categoryNames, 
  //       datasets: [{
  //         label: 'Number of Products',
  //         data: productCounts, //  products per category
  //         backgroundColor: 'rgba(54, 162, 235, 0.6)',
  //         borderColor: 'rgba(54, 162, 235, 1)',
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       scales: {
  //         x: {
  //           title: {
  //             display: true,
  //             text: 'Categories',
  //             font: { size: 14 }
  //           },
  //           ticks: {
  //             autoSkip: false,
  //             maxRotation: 45,
  //             minRotation: 45
  //           }
  //         },
  //         y: {
  //           title: {
  //             display: true,
  //             text: 'Number of Products',
  //             font: { size: 14 }
  //           },
  //           beginAtZero: true
  //         },
  //       },
  //     },
  //   });
  // }
  createCategoryProductChart(categoryNames: string[], productCounts: number[]) {
    new Chart(this.CategoriesChartCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: categoryNames,
        datasets: [{
          data: productCounts,
          backgroundColor: [
            '#4361ee',
            '#3da9fc',
            '#7209b7',
            '#2ec4b6',
            '#ff6b6b',
            '#ff9f1c',
            '#e71d36',
            '#2ec4b6'
          ],
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              padding: 20,
              font: {
                size: 12
              }
            }
          },
          title: {
            display: true,
            text: 'Products per Category',
            font: {
              size: 16
            }
          }
        }
      }
    });
  }

  fetchCategoryProductStats() {
    this.dashboardService.getAllCategories().subscribe({
      next:(response) => {
          if (response && Array.isArray(response)) {
        
        const categoryNames = response.map(category => category.name);
        
        const productCounts = response.map(category => category.products.length);
      // const productCounts = response.map(subcategory => subcategory.productCount);
  
        console.log("Category Names:", categoryNames);
        console.log("Product Counts per Category:", productCounts);
  
        this.createCategoryProductChart(categoryNames, productCounts);
      } else {
        console.error("Invalid response format for categories", response);
      }
    }, 
      });
    // this.dashboardService.getAllCategories().subscribe(response => {
    //   console.log("API Response (Categories):", response);
  
    //   if (response && Array.isArray(response)) {
        
    //     const categoryNames = response.map(category => category.name);
    //     const productCounts = response.map(category => category.products.length);
  
    //     console.log("Category Names:", categoryNames);
    //     console.log("Product Counts per Category:", productCounts);
  
    //     this.createCategoryProductChart(categoryNames, productCounts);
    //   } else {
    //     console.error("Invalid response format for categories", response);
    //   }
    // }, error => {
    //   console.error("API Error (Categories):", error);
    // });
  }
  

  createCategoriesChart() {
    new Chart(this.CategoriesChartCanvas.nativeElement, {
      type: 'pie', 
      data: {
        labels: ['Total Categories'],
        datasets: [{
          label: 'Category Count',
          data: [this.statistics[4].value],
          backgroundColor: ['rgba(75, 192, 192, 0.6)'],
          borderColor: ['rgba(75, 192, 192, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        }
      }
    });
  }


  fetchProductOrderStats() {
    // this.dashboardService.getAllProducts().subscribe(response => {
    //   console.log("API Response (Products):", response);
  
    //   if (response && Array.isArray(response)) {
    //     // Extract product names and count their order items
    //     const productNames = response.map(product => product.name);
    //     const orderCounts = response.map(product => product.orderItems ? product.orderItems.length : 0);
  
    //     console.log("Product Names:", productNames);
    //     console.log("Order Counts per Product:", orderCounts);
  
    //     this.createProductOrderChart(productNames, orderCounts);
    //   } else {
    //     console.error("Invalid response format for products", response);
    //   }
    // }, error => {
    //   console.error("API Error (Products):", error);
    // });

    this.dashboardService.getAllProducts().subscribe({
      next:(response) => {
          if (response && Array.isArray(response)) {
        // Extract product names and count their order items
        const productNames = response.filter(p=>p.orderItems.length!=0).map(product => product.name);
        const orderCounts = response.filter(p=>p.orderItems.length!=0).map(product => product.orderItems ? product.orderItems.length : 0);
  
        console.log("Product Names:", productNames);
        console.log("Order Counts per Product:", orderCounts);
  
        this.createProductOrderChart(productNames, orderCounts);
      } else {
        console.error("Invalid response format for products", response);
      }
    },
        
    });
  }

  
  createProductOrderChart(productNames: string[], orderCounts: number[]) {
    new Chart(this.productChartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: productNames, 
        datasets: [{
          label: 'Number of Orders',
          data: orderCounts, 
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Products',
              font: { size: 14 }
            },
            ticks: {
              autoSkip: false,
              maxRotation: 45,
              minRotation: 45
            }
          },
          y: {
            title: {
              display: true,
              text: 'Number of Orders',
              font: { size: 14 }
            },
            beginAtZero: true
          }
        }
      }
    });
  }

  fetchOrderStats() {
    this.dashboardService.getAllOrders().subscribe({
      next: (response) => {
        console.log("API Response (Orders):", response);
  
        if (response && Array.isArray(response)) {
          this.orderCount = response.length;
          this.statistics[1].value = this.orderCount;
  
         
          this.revenue = response.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
          this.statistics[3].value = this.revenue; 
          console.log("Total Revenue:", this.revenue);
        } else {
          console.error("Invalid response format for orders", response);
        }
      },
      error: (error) => {
        console.error("API Error (Orders):", error);
      }
    });



  }
  
  
}


