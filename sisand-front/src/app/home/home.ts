import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonModule } from '@angular/common';
import { ToastService } from '../services/toast.service';
import { NgZone } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [CommonModule, RouterModule],
})
export class HomeComponent {
  constructor(
    public authService: AuthService,
    private router: Router,
    private zone: NgZone,
    private toastService: ToastService
  ) {}
  menuAberto = false;

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
