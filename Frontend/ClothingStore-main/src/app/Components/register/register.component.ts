import { CommonModule } from '@angular/common';

import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserAuthService } from '../../Services/User/user-auth.service';
import { HttpClient } from '@angular/common/http';
import { registerDTO } from '../../Models/user/user';
import { __await } from 'tslib';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  reg:registerDTO={
    firstName:'',
    lastName:'',
    userName:'',
    dateOfBirth:new Date(),
    email:'',
    phoneNumber:'',
    password:'',
    confirmPassword:'',
    rememberme:false
  };
  err:string | null=null;
  constructor(
    private fb: FormBuilder ,
    private router: Router,
    private userAuthService:UserAuthService,
    private http:HttpClient) {}
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z0-9_]+$')
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z0-9_]+$')
      ]],
      userName: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z0-9_]+$')
      ]],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', [Validators.required,Validators.minLength(11),Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$')
      ]],
      confirmPassword: ['', Validators.required],
      remeberme: [false]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  register() {
    if (this.registerForm.valid) {
      this.reg=this.registerForm.value;
      this.userAuthService.register(this.reg).subscribe({
        next: (str) => {
          console.log('form submitted',str);
          if ( str.status=== 200) {
            this.router.navigate(['/login']);
            this.err=null;
          }
        },
        error: (error) => {
          console.log('error',error);
          if (error.status === 400 && error.error.errors) {
            // Extract the error messages from the response and display them
            const errorMessages = [];
            for (const key in error.error.errors) {
              if (error.error.errors.hasOwnProperty(key)) {
                const messages = error.error.errors[key];
                errorMessages.push(...messages);
              }
            }

            // Display the error messages to the user
            this.err = errorMessages.join(' | ');
          }else{
            this.err=error.error;
          }
      }});
    }
  }
}
