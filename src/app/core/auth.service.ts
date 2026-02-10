import { Injectable, signal } from '@angular/core';

export interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly storageKey = 'currentUser';
  isLoggedIn = signal(false);

  setCurrentUser(user: User): void {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  getCurrentUser(): User | null {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  }

  clear(): void {
    localStorage.removeItem(this.storageKey);
  }

  isAuthenticated(): boolean {
    this.isLoggedIn = signal(true);
    return this.getCurrentUser() !== null;
  }
}

