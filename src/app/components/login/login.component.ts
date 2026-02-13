import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // creating login fields
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  
  constructor(private authService : AuthService, private router: Router){}

  onLogin(){
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful!', response);
          
          // access the token from json object
          const jwtToken = response.token;
          localStorage.setItem('token', jwtToken);

          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Login Error:', err);
          alert('Invalid username or password');
        }
      });
    }
  }
}
