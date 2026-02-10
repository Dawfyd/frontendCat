import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService, User } from '../../core/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page auth-page">
      <h1>Login</h1>

      <form (ngSubmit)="onSubmit()">
        <label>
          Email:
          <input type="email" [(ngModel)]="email" name="email" required />
        </label>

        <label>
          Contraseña:
          <input
            type="password"
            [(ngModel)]="password"
            name="password"
            required
          />
        </label>

        <button type="submit">Entrar</button>
      </form>

      <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  `,
  styles: [
    `
      .page {
        max-width: 400px;
        margin: 0 auto;
        padding: 1rem;
      }
      form {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      label {
        display: flex;
        flex-direction: column;
      }
      .error {
        color: #b00020;
        margin-top: 0.5rem;
      }
    `
  ]
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  private readonly apiBase = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.errorMessage = '';

    this.http
      .get<User>(`${this.apiBase}/login`, {
        params: { email: this.email, password: this.password }
      })
      .subscribe({
        next: (user) => {
          this.authService.setCurrentUser(user);
          this.router.navigate(['/profile']);
        },
        error: () => {
          this.errorMessage = 'Credenciales inválidas';
        }
      });
  }
}

