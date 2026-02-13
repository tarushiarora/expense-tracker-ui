import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  // register fields
  registrationForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(private authService: AuthService, private router: Router){}

  onRegister(){
    if(this.registrationForm.valid){
      this.authService.register(this.registrationForm.value).subscribe({
        next: (response) => {
          alert('Registration successful! You can proceed to login');
          this.router.navigate(['/login']);
        },

        error: (err) => {
          alert('Registration failed. Username or email might be taken!')
        }
      });
    }
  }
}
