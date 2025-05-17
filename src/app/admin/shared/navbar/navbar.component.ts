import { CommonModule } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isActive: boolean = false;

  constructor(private _Router: Router) { }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 991) {
      this.isActive = false;
    }
  }

  toggleNav() {
    this.isActive = !this.isActive;
  }

  closeNav() {
    this.isActive = false;
  }
  logout() {
    localStorage.removeItem('adminSkyVoyager');
    this._Router.navigateByUrl('/login');
  }
}
