import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="logo">🐱 CatApp</div>

      <div class="links">
        <a routerLink="/cats" routerLinkActive="active">Razas</a>
        @if(auth.isLoggedIn()){
          <a routerLink="/profile">Perfil</a>
        } @else {
          <a routerLink="/login">Login</a>
          <a routerLink="/register">Registro</a>
        }
      </div>
    </nav>
  `,
styles: [`
    :host {
      --primary: #6C63FF;
      --bg-dark: #0f172a;
      --card-bg: rgba(30, 41, 59, 0.7);
      --border-color: rgba(255, 255, 255, 0.1);
      --text-muted: #94a3b8;
    }

    .navbar {
      position: sticky;
      top: 0;
      z-index: 1000;

      display: flex;
      justify-content: space-between;
      align-items: center;

      padding: 1rem 2.5rem;

      background: #0f172a;
      backdrop-filter: blur(12px);

      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      border-bottom: 1px solid var(--border-color);
    }

    .logo {
      font-size: 1.4rem;
      font-weight: 800;
      letter-spacing: .5px;
      cursor: pointer;

      background: linear-gradient(to right, #fff, #8E87FF);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      transition: transform .2s ease;
    }

    .logo:hover {
      transform: scale(1.03);
    }

    .links {
      display: flex;
      align-items: center;
      gap: 1.8rem;
    }

    a {
      position: relative;
      color: var(--text-muted);
      text-decoration: none;
      font-weight: 500;
      font-size: .95rem;
      transition: all .25s ease;
    }

    a:hover, a.active {
      color: white;
    }

    a::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -6px;
      width: 0%;
      height: 2px;
      background: var(--primary);
      transition: width .25s ease;
      box-shadow: 0 0 8px rgba(108, 99, 255, 0.5);
    }

    a:hover::after, a.active::after {
      width: 100%;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .navbar {
        padding: 1rem 1.5rem;
      }

      .links {
        gap: 1.2rem;
      }

      .logo {
        font-size: 1.2rem;
      }

      a {
        font-size: 0.85rem;
      }
    }
  `]

})
export class NavbarComponent {
  auth = inject(AuthService);
}
