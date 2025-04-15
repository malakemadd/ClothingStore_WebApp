import { AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { UserAuthService } from './Services/User/user-auth.service';
import { NavBarComponent } from "./Components/nav-bar/nav-bar.component";
import { FooterComponent } from './Components/footer/footer.component';
import { AlertComponent } from './Components/alert/alert.component';
import { isAuthenticated } from './Models/user/user';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, AlertComponent,NavBarComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{
  title = 'ClothingStore';
  islogged!:isAuthenticated| undefined;
  error: string|null=null;
  constructor(private userAuthService: UserAuthService,private router:Router) {
    
  }
  ngOnInit(): void {
    this.userAuthService.getUserLogged().subscribe({
      next: (data)=>{this.islogged=data,
        console.log(this.islogged);
      },
      error: (err)=> this.error=err
    }
    )
    console.log(this.islogged?.isAuthenticated,this.islogged?.userName);
    console.log("hiii");
  }
  logout(){
    this.userAuthService.logout().subscribe({
      next: (str) => {
        this.islogged!.isAuthenticated=false,
        console.log('form submitted',str);
        if ( str.status=== 200) {
          this.router.navigate(['/login']);
        }
      }
  })
  }
  }

