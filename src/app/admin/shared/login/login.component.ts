import { Component } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, Toast],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent {
  constructor(
    private _AdminService: AdminService,
    private _MessageService: MessageService,
    private _Router: Router
  ) { }
  adminLoginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  adminLogin(adminLoginForm: FormGroup) {
    this._AdminService.adminLogin(adminLoginForm.value).subscribe({
      next: (data: any) => {
        localStorage.setItem('adminSkyVoyager', data.access_token)
        this._MessageService.add({
          severity: 'success',
          summary: 'Done Successfully !',
          detail: 'Welcome Back Admin',
          life: 2000
        });
        setTimeout(() => {
          this._Router.navigateByUrl('/dashboard/welcome');
        }, 1400);
      },
      error: (error) => {
        this._MessageService.add({
          severity: 'error',
          summary: 'Something Error',
          detail: 'Make Sure Of Email & Password Corrected !',
        })
      },
    });
  }
}
