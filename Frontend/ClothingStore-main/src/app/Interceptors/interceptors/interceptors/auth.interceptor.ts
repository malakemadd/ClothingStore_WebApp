import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root' // Ensures it's available in the entire app
// })
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private router: Router) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return next.handle(req).pipe(
//       catchError((error: HttpErrorResponse) => {
//         if (error.status === 401) {
//           // Redirect to login page when unauthorized
//           this.router.navigate(['/login']);
//         }
//         return throwError(() => error);
//       })
//     );
//   }
// }
export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
  
    return next(req).pipe(
      catchError((error) => {
        if (error.status === 401) {
          // Redirect to login page on unauthorized error
          console.log("unauthorized detected");
          router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  };
  