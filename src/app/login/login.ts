import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import e from 'express';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',

})
export class Login {

  loginObj : any ={
    email: '',
    contact: '',
  }

  http = inject(HttpClient);
  route = inject(Router);

  onLogin() {
    this.http.post('https://localhost:7174/api/employee/login',this.loginObj).subscribe({
      next: (res : any) => {
        console.log(res);
        alert('Login successful');
        localStorage.setItem('employee', JSON.stringify(res.employee));
        this.route.navigate(['dashboard']);
      },
      error: (err) => {
        alert(err.error.message);
      }
    })
  }
}
