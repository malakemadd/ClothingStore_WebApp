import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShirt, faTruck, faUsers, faHandshake } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './about.component.html',

})
export class AboutComponent {
  faShirt = faShirt;
  faTruck = faTruck;
  faUsers = faUsers;
  faHandshake = faHandshake;
}