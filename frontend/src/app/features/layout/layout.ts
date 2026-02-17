import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ButtonDirective } from '../../shared/components/button/button';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.html',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ButtonDirective],
})
export class LayoutComponent {
  private authService = inject(AuthService);

  user = computed(() => this.authService.currentUser());
  isAdmin = computed(() => this.user()?.role === 'admin');
  sidebarOpen = signal(false);

  toggleSidebar(): void {
    this.sidebarOpen.update((v) => !v);
  }

  onLogout(): void {
    this.authService.logout().subscribe();
  }
}
