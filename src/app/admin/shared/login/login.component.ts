import { Component } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { MessageService } from 'primeng/api';
// import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  // providers: [MessageService]
})
export class LoginComponent {
  // constructor(
  //   private _AdminService: AdminService,
  //   private _MessageService: MessageService,
  //   private _Router: Router
  // ) { }
  // adminLoginForm = new FormGroup({
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(8),
  //   ]),
  // });
  // adminLogin(adminLoginForm: FormGroup) {
  //   this._AdminService.adminLogin(adminLoginForm.value).subscribe({
  //     next: (data: any) => {
  //       localStorage.setItem('admin', data.access_token);
  //       this._MessageService.add({
  //         severity: 'success',
  //         summary: 'تم تسجيل الدخول بنجاح',
  //         detail: 'مرحبا بك يا مشرف ',
  //         styleClass: 'custom-toast-message',
  //         life: 2000
  //       });
  //       setTimeout(() => {
  //         this._Router.navigateByUrl('/dashboard');
  //       }, 2200);
  //     },
  //     error: (error) => {
  //       this._MessageService.add({
  //         severity: 'error',
  //         summary: 'حدث خطا ما',
  //         detail: 'تأكد من صحة بريدك الإلكتروني او كلمة المرور !',
  //         styleClass: 'custom-toast-message'
  //       })
  //     },
  //   });
  // }
}
