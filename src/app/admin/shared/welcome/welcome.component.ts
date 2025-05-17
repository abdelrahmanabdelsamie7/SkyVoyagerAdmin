import { Component, DestroyRef, OnInit, signal, OnDestroy } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { Admin } from '../../../core/interfaces/admin';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {
  constructor(private _AdminService: AdminService, private _DestroyRef: DestroyRef) { }
  admin = signal<Admin>({
    id: '',
    name: '',
    email: '',
    password: '',
    created_at: ''
  })
  ngOnInit(): void {
    const subscription = this._AdminService.adminAccount().subscribe({
      next: (res) => {
        this.admin.set(res);
      }
    })
    this._DestroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
