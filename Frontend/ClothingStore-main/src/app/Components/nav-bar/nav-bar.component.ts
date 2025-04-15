import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserAuthService } from '../../Services/User/user-auth.service';
import { isAuthenticated } from '../../Models/user/user';


@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
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

