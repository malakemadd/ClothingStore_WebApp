import { HttpClient} from '@angular/common/http';
import { Injectable} from '@angular/core';
import { isAuthenticated, logDTO, registerDTO} from '../../Models/user/user';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  islogged: BehaviorSubject<any> = new BehaviorSubject(false);
  url:string = "";
  constructor(private http: HttpClient,private router:Router,
    private cookieservice:CookieService) { }

register (reg:registerDTO):Observable<any> {
  this.islogged.next(true);
  return this.http.post<any>('http://localhost:5248/api/Account/register',reg,{withCredentials:true,observe:'response'})
}
  login (log:logDTO):Observable<any> {
    localStorage.setItem('userNameOrEmail',log.usernameOrEmail);
    this.islogged.next(true);
    return this.http.post<any>('http://localhost:5248/api/Account/login',log,{withCredentials:true,observe:'response'})
  }
  logout () {
    localStorage.removeItem('userNameOrEmail');
    this.islogged.next(false);
    return this.http.post<any>('http://localhost:5248/api/Account/logout',null,{withCredentials:true,observe:'response'})
    ;
  }
getUserLogged():Observable<isAuthenticated>{
  // return this.islogged.getValue();
  return this.http.get<isAuthenticated>("http://localhost:5248/api/Account/IsAuthenticated",{withCredentials:true});
}
externallogin(provider:string,returnUrl:string){
  this.islogged.next(true);
  // return this.http.get('http://localhost:5248/api/Account/External-login',{params:{provider:prov,returnUrl:url},withCredentials:true,observe:'response'});
  this.url=`http://localhost:5248/api/Account/External-login?provider=${encodeURIComponent(provider)}&returnUrl=${encodeURIComponent(returnUrl)}`;
  window.location.href=this.url;
}
}
