import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.component.html',

})
export class ErrorComponent {
  errorMessage: string | null = null;
constructor(private route: ActivatedRoute){

}
ngOnInit() {
  this.route.queryParams.subscribe(params => {
    if (params['error']) {
      this.errorMessage = params['error'];
    }
  });
}
}
