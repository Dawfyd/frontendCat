import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page auth-page">
      <h1>Registro</h1>

      <form (ngSubmit)="onSubmit()">
        <label>
          Nombre:
          <input type="text" [(ngModel)]="name" name="name" required />
        </label>

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

        <button type="submit">Registrarse</button>
      </form>

      <p *ngIf="message" class="info">{{ message }}</p>
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
      .info {
        margin-top: 0.5rem;
      }
    `
  ]
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  message = '';

  private readonly apiBase = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    this.message = '';

    this.http
      .get(`${this.apiBase}/register`, {
        params: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      })
      .subscribe({
        next: () => {
          this.message = 'Usuario registrado correctamente';
          this.router.navigate(['/login']);
        },
        error: () => {
          this.message = 'No se pudo registrar el usuario';
        }
      });
  }
}

