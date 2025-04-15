import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  imports: [RouterModule],
  templateUrl: './payment-success.component.html',

})
export class PaymentSuccessComponent {
  constructor(private router: Router) {}
  goToHome() {
    this.router.navigate(['/']);
  }

  viewOrders() {
    this.router.navigate(['/orders']);
  }
}
