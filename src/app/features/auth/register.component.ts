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
  styles: [`
    :host {
      --primary: #6C63FF;
      --bg-dark: #0f172a;
      --card-bg: rgba(30, 41, 59, 0.6);
      --border-color: rgba(255,255,255,0.08);
      --text-muted: #94a3b8;

      display:block;
      min-height:100vh;
      background: radial-gradient(circle at top, #1e293b, #020617);
      font-family: 'Inter', system-ui, sans-serif;
      color:white;
    }

    .auth-page{
      padding-top: 5rem;
      display:flex;
      gap:2rem;
      align-items:center;
      justify-content:center;
    }

    form{
      width:100%;
      max-width:380px;
      padding:2.2rem;
      border-radius:18px;
      background: var(--card-bg);
      backdrop-filter: blur(14px);
      border:1px solid var(--border-color);
      box-shadow: 0 20px 60px rgba(0,0,0,.5);
    }

    h1{
      text-align:center;
      margin-bottom:1.8rem;
      font-size:2rem;
      font-weight:800;
      background: linear-gradient(to right, #fff, #8E87FF);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
    }

    label{
      display:flex;
      flex-direction:column;
      font-size:.8rem;
      font-weight:600;
      gap:.4rem;
      color:var(--text-muted);
      margin-bottom:.9rem;
    }

    input{
      padding:.75rem .85rem;
      border-radius:10px;
      border:1px solid var(--border-color);
      background: rgba(15,23,42,.8);
      color:white;
      outline:none;
      transition:.25s;
    }

    input::placeholder{
      color:#64748b;
    }

    input:focus{
      border:1px solid var(--primary);
      box-shadow:0 0 0 3px rgba(108,99,255,.25);
    }

    button{
      margin-top:1.2rem;
      padding:.8rem;
      border:none;
      border-radius:10px;
      background: linear-gradient(135deg,#6C63FF,#8E87FF);
      color:white;
      font-weight:700;
      cursor:pointer;
      transition:.25s;
    }

    button:hover{
      transform: translateY(-2px);
      box-shadow:0 10px 25px rgba(108,99,255,.5);
    }

    button:active{
      transform:translateY(0);
      box-shadow:none;
    }

    .info{
      margin-top:1rem;
      padding:.6rem;
      border-radius:8px;
      background: rgba(0,255,180,.08);
      border:1px solid rgba(0,255,180,.25);
      color:#34d399;
      text-align:center;
      font-size:.85rem;
    }

    @media(max-width:500px){
      form{
        padding:1.6rem;
      }
    }
  `]

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

