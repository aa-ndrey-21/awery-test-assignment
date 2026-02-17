import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { User } from '../models/user.model';

interface AuthResponse {
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  currentUser = signal<User | null>(null);
  private initialized = false;
  private initPromise: Promise<boolean> | null = null;

  isLoggedIn(): boolean {
    return !!this.currentUser();
  }

  checkSession(): Promise<boolean> {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = new Promise((resolve) => {
      this.http.get<AuthResponse>('/api/user').subscribe({
        next: (res) => {
          this.currentUser.set(res.user);
          this.initialized = true;
          resolve(true);
        },
        error: () => {
          this.currentUser.set(null);
          this.initialized = true;
          resolve(false);
        },
      });
    });

    return this.initPromise;
  }

  login(email: string, password: string) {
    return this.http.get('/sanctum/csrf-cookie').pipe(
      switchMap(() => this.http.post<AuthResponse>('/api/login', { email, password })),
      tap((res) => {
        this.currentUser.set(res.user);
        this.initPromise = Promise.resolve(true);
      }),
    );
  }

  fetchUser() {
    return this.http.get<AuthResponse>('/api/user').pipe(
      tap((res) => {
        this.currentUser.set(res.user);
      }),
    );
  }

  logout() {
    return this.http.post('/api/logout', {}).pipe(
      tap(() => {
        this.clearAuth();
        this.router.navigate(['/login']);
      }),
    );
  }

  clearAuth(): void {
    this.currentUser.set(null);
    this.initPromise = null;
  }
}
