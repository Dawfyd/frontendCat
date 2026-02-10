import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../../core/auth.service';


@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [CommonModule],
  template: `
  <div class="profile-page">

    <div *ngIf="user; else noUser" class="card">

      <div class="avatar">
        {{ user.name.charAt(0).toUpperCase() }}
      </div>

      <h1>{{ user.name }}</h1>
      <p class="email">{{ user.email }}</p>

      <div class="divider"></div>

      <button class="logout" (click)="logout()">
        Cerrar sesión
      </button>

    </div>

    <ng-template #noUser>
      <div class="card empty">
        <h2>No hay usuario autenticado</h2>
        <p>Por favor inicia sesión para ver tu perfil.</p>

        <button (click)="goToLogin()">
          Ir a Login
        </button>
      </div>
    </ng-template>

  </div>
`,

  styles: [`
    :host {
      --primary: #6C63FF;
      --card-bg: rgba(30, 41, 59, 0.6);
      --border-color: rgba(255,255,255,0.08);
      --text-muted: #94a3b8;

      display:block;
      min-height:100vh;
      background: radial-gradient(circle at top, #1e293b, #020617);
      font-family: 'Inter', system-ui, sans-serif;
      color:white;
    }

    .profile-page{
      display:flex;
      align-items:center;
      justify-content:center;
      padding-top:5rem;
    }

    .card{
      width:100%;
      max-width:380px;
      padding:2.4rem;
      border-radius:20px;
      text-align:center;
      background: var(--card-bg);
      backdrop-filter: blur(14px);
      border:1px solid var(--border-color);
      box-shadow: 0 25px 70px rgba(0,0,0,.55);
    }

    .avatar{
      width:90px;
      height:90px;
      margin:0 auto 1rem;
      border-radius:50%;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:2rem;
      font-weight:800;
      background: linear-gradient(135deg,#6C63FF,#8E87FF);
      box-shadow:0 10px 30px rgba(108,99,255,.6);
    }

    h1{
      margin:.4rem 0;
      font-size:1.6rem;
      font-weight:800;
      background: linear-gradient(to right,#fff,#8E87FF);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
    }

    .email{
      color:var(--text-muted);
      font-size:.9rem;
    }

    .divider{
      height:1px;
      width:100%;
      margin:1.6rem 0;
      background:var(--border-color);
    }

    button{
      width:100%;
      padding:.85rem;
      border:none;
      border-radius:12px;
      font-weight:700;
      cursor:pointer;
      transition:.25s;
    }

    button:hover{
      transform:translateY(-2px);
    }

    .logout{
      background: linear-gradient(135deg,#ff4d6d,#ff758f);
      color:white;
      box-shadow:0 10px 25px rgba(255,77,109,.45);
    }

    .logout:hover{
      box-shadow:0 14px 30px rgba(255,77,109,.6);
    }

    .empty h2{
      margin-bottom:.5rem;
    }

    .empty p{
      color:var(--text-muted);
      margin-bottom:1.2rem;
    }

    .empty button{
      background: linear-gradient(135deg,#6C63FF,#8E87FF);
      color:white;
      box-shadow:0 10px 25px rgba(108,99,255,.45);
    }

    @media(max-width:500px){
      .card{
        margin:0 1rem;
        padding:2rem;
      }
    }
  `]

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
  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}

