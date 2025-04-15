import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, NgModel, NgModelGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddressForm, BillingDetails, Cart, PaymentMethod } from '../../Models/cart';
import { OrderServiceService } from '../../Services/order-service.service';
import { faTruck, faCreditCard,faNoteSticky,faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faStripe } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-check-out',
  imports: [RouterModule,CommonModule,ReactiveFormsModule,FontAwesomeModule,FormsModule],
  templateUrl: './check-out.component.html',

})
export class CheckOutComponent {
  id: number=0;
  order!:Cart
  error:string|null=null;
  constructor(private route: ActivatedRoute,private fb: FormBuilder,private cartservice:OrderServiceService,private router:Router) { }
  billingForm!: FormGroup
  paymentForm!:FormGroup
  faTruck = faTruck;
  faCreditCard = faCreditCard;
  faStripe = faStripe;
  faNoteSticky = faNoteSticky;
  faLocationDot = faLocationDot;
  // faCreditCard = faCreditCard;
  PaymentMethod = PaymentMethod;
  mybilldetails!:BillingDetails
  paymentMethod: string = 'OnDelivery';
  
  
  validationMessages = {
    country: {
      required: 'Country is required',
      minlength: 'Country name must be at least 3 characters'
    },
    streetAddress: {
      required: 'Street address is required',
      minlength: 'Address must be at least 5 characters'
    },
    city: {
      required: 'City is required',
      minlength: 'City name must be at least 2 characters'
    },
    state: {
      required: 'State is required',
      minlength: 'State name must be at least 2 characters'
    },
    postcode: {
      required: 'Postcode is required',
      pattern: 'Postcode must be 5 digits'
    },
    orderNotes: {
      maxlength: 'Notes cannot exceed 500 characters'
    }
    , cardNumber: {
      required: 'Card number is required',
      pattern: 'Please enter a valid 16-digit card number'
    },
    cardExpiry: {
      required: 'Expiry date is required',
      pattern: 'Please enter a valid date (MM/YY)'
    },
    cardCvv: {
      required: 'CVV is required',
      pattern: 'Please enter a valid CVV (3-4 digits)'
    }
  };
  ngOnInit(): void {
      this.route.params.subscribe(params => {
      this.id = +params['id'];  
      console.log('Checkout ID:', this.id);  });
      
      this.billingForm = this.fb.group({
        country: ['', [Validators.required, Validators.minLength(3)]],
        streetAddress: ['', [Validators.required, Validators.minLength(5)]],
        apartment: [''],
        city: ['', [Validators.required, Validators.minLength(2)]],
        state: ['', [Validators.required, Validators.minLength(2)]],
        postcode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
        addNote: [false],
        orderNotes: ['', [Validators.maxLength(500)]],
        
      });
      this.paymentForm=this.fb.group({
        cardNumber: [''],
        cardExpiry: [''],
        cardCvv: [''],
      })


      
      
      this.cartservice.getCart().subscribe({
        next:(data) => {
          this.order=data;
          console.log(this.order);
          this.error = null;
        },
        error:(err)=>{
          if (err.status === 404) {
            this.error = 'order not found';
          } else {
            this.error = 'An error occurred while fetching the order';
          }
          this.error = null;
          console.error('Error fetching order:', err);
        }
        
      }
      );
    }
      


    
    onPaymentMethodChange(e:any){
      const target = e.target as HTMLInputElement;
      this.paymentMethod = target.value;
      console.log('Selected Payment:', this.paymentMethod);
      if (this.paymentMethod === 'Credit Card') {
        // Add validators when credit card is selected
        this.paymentForm.get('cardNumber')?.setValidators([Validators.required, Validators.pattern(/^\d{16}$/)]);
        this.paymentForm.get('cardExpiry')?.setValidators([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)]);
        this.paymentForm.get('cardCvv')?.setValidators([Validators.required, Validators.pattern(/^\d{3,4}$/)]);
      } else {
        // Remove validators when other payment methods are selected
        this.paymentForm.get('cardNumber')?.clearValidators();
        this.paymentForm.get('cardExpiry')?.clearValidators();
        this.paymentForm.get('cardCvv')?.clearValidators();
      }
  
      // Update form validation
      this.paymentForm.get('cardNumber')?.updateValueAndValidity();
      this.paymentForm.get('cardExpiry')?.updateValueAndValidity();
      this.paymentForm.get('cardCvv')?.updateValueAndValidity();
      

      
    }
      onSubmit() {
        if (this.billingForm.valid) {
          
          switch(this.paymentMethod){
            case "OnDelivery":
              this.mybilldetails=this.billingForm.value;
              this.mybilldetails.method=PaymentMethod.OnDelivery;
              this.cartservice.confirmorder(this.mybilldetails).subscribe({
                next:(data) => {
                  console.log(this.order);
                  this.error = null;
                  this.router.navigate(['/success']);
                },
                error:(err)=>{
                  if (err.status === 404) {
                    this.error = 'order not found';
                  } else {
                    this.error = 'An error occurred while fetching the order';
                  }
                  this.error = null;
                  console.error('Error fetching order:', err);
                }
                
              }
              );
              break;
              case "Stripe":
              this.mybilldetails=this.billingForm.value;
              this.mybilldetails.method=PaymentMethod.Stripe;
              this.cartservice.confirmorderstripe(this.mybilldetails).subscribe({
                next:(data) => {
                  
                  console.log(data);
                  window.location.href=data.url;
                  this.error = null;
                },
                error:(err)=>{
                  if (err.status === 404) {
                    this.error = 'order not found';
                  } else {
                    this.error = 'An error occurred while fetching the order';
                  }
                  this.error = null;
                  console.error('Error fetching order:', err);
                }
                
              }
              );
            break; 
              case "Credit Card":
      
              this.mybilldetails=this.billingForm.value;
                this.mybilldetails.paymentdetails=this.paymentForm.get('cardNumber')?.value;
              this.mybilldetails.method=PaymentMethod.CreditCard;
              
              this.cartservice.confirmorder(this.mybilldetails).subscribe({
                next:(data) => {
                  console.log(this.order);
                  this.error = null;
                  this.router.navigate(['/success']);
                },
                error:(err)=>{
                  if (err.status === 404) {
                    this.error = 'order not found';
                  } else {
                    this.error = 'An error occurred while fetching the order';
                  }
                  this.error = null;
                  console.error('Error fetching order:', err);
                }
                
              }
              );
              break;
          }
          
        }
        else {
          console.log("invalid");
          // Mark all fields as touched to trigger validation display
          Object.keys(this.billingForm.controls).forEach(key => {
              const control = this.billingForm.get(key);
              control?.markAsTouched();
          });
      }
      }
    }

