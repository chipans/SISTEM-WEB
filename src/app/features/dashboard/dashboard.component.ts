import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'sistem-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html'
})
export default class DashboardComponent {
  #authService = inject(AuthService);

  currentUser = this.#authService.currentUser;

  logout(): void {
    this.#authService.logout();
  }
}
