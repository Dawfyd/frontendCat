import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../../core/auth.service';


@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [CommonModule],
  template: `
    <div class="page">
      <h1>Perfil de usuario</h1>

      <ng-container *ngIf="user; else noUser">
        <p><strong>Nombre:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>

        <button (click)="logout()">Cerrar sesión</button>
      </ng-container>

      <ng-template #noUser>
        <p>No hay usuario autenticado.</p>
      </ng-template>
    </div>
  `,
  styles: [
    `
      .page {
        max-width: 480px;
        margin: 0 auto;
        padding: 1rem;
      }
      button {
        margin-top: 1rem;
      }
    `
  ]
})
export class ProfileComponent implements OnInit {
  user : User | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

  logout(): void {
    this.authService.clear();
    this.router.navigate(['/login']);
  }
}

