import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatService, Breed, CatImage } from '../../core/cat.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'app-cat-breeds',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page">
      <h1>Razas de gatos</h1>

      <section class="filters">
        <label>
          Raza:
          <select [(ngModel)]="selectedBreedId" (change)="onBreedChange()">
            <option value="">Seleccione una raza</option>
            <option *ngFor="let breed of breeds()" [value]="breed.id">
              {{ breed.name }}
            </option>
          </select>
        </label>

        <label>
          Filtro por nombre:
          <input
            type="text"
            [ngModel]="searchTerm()"
            (ngModelChange)="search$.next($event)"

          />
        </label>
      </section>

      <section *ngIf="selectedBreed()" class="breed-detail">
        <h2>{{ selectedBreed()?.name }}</h2>
        <p>{{ selectedBreed()?.description }}</p>
        <p><strong>Origen:</strong> {{ selectedBreed()?.origin }}</p>
        <p><strong>Inteligencia:</strong> {{ selectedBreed()?.intelligence }}</p>
      </section>

      <section *ngIf="images().length" class="carousel">
        <h3>Imágenes</h3>
        <div class="carousel-container">
          <img
            *ngFor="let img of images()"
            [src]="img.url"
            [alt]="selectedBreed()?.name"
          />
        </div>
      </section>

      <section class="table-section">
        <h3>Listado de razas</h3>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Origen</th>
              <th>Inteligencia</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let breed of filteredBreeds()">
              <td>{{ breed.name }}</td>
              <td>{{ breed.origin }}</td>
              <td>{{ breed.intelligence }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  `,
  styles: [`
    :host {
      --primary: #6C63FF;
      --bg-dark: #0f172a;
      --card-bg: rgba(30, 41, 59, 0.5);
      --border-color: rgba(255, 255, 255, 0.1);
      --text-muted: #94a3b8;
      display: block;
      background-color: var(--bg-dark);
      color: #f8fafc;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }

    .page {
      max-width: 1100px;
      margin: 2rem auto;
      padding: 2rem;
    }

    h1 {
      font-size: 2.5rem;
      font-weight: 800;
      margin-bottom: 1.5rem;
      background: linear-gradient(to right, #fff, #8E87FF);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    h2 { margin-bottom: .5rem; font-weight: 700; }
    h3 { margin-bottom: 1rem; color: var(--text-muted); font-size: 1.1rem; text-transform: uppercase; letter-spacing: 1px; }

    /* FILTER CARD */
    .filters {
      display: flex;
      gap: 1.5rem;
      flex-wrap: wrap;
      padding: 1.5rem;
      border-radius: 14px;
      background: var(--card-bg);
      backdrop-filter: blur(10px);
      border: 1px solid var(--border-color);
      box-shadow: 0 10px 30px rgba(0,0,0,.25);
      margin-bottom: 1.8rem;
    }

    label {
      display: flex;
      flex-direction: column;
      font-size: .8rem;
      font-weight: 600;
      gap: .5rem;
      color: var(--text-muted);
    }

    select, input {
      padding: .65rem .8rem;
      border-radius: 8px;
      border: 1px solid var(--border-color);
      background: rgba(15, 23, 42, 0.8);
      color: white;
      outline: none;
      transition: all .25s;
      min-width: 200px;
    }

    input:focus, select:focus {
      border: 1px solid var(--primary);
      box-shadow: 0 0 0 3px rgba(108,99,255,.2);
    }

    /* BREED CARD */
    .breed-detail {
      margin-bottom: 1.8rem;
      padding: 2rem;
      border-radius: 16px;
      background: linear-gradient(145deg, rgba(255,255,255,.05), rgba(255,255,255,.01));
      border: 1px solid var(--border-color);
      box-shadow: 0 15px 40px rgba(0,0,0,.3);
    }

    .breed-detail p {
      color: #cbd5e1;
      line-height: 1.6;
      margin-bottom: 0.8rem;
    }

    .breed-detail strong { color: var(--primary-light); }

    /* CAROUSEL (Restaurado a tu tamaño original) */
    .carousel-container {
      display: flex;
      gap: .8rem;
      overflow-x: auto;
      padding-bottom: 1rem;
      margin-bottom: 2rem;
    }

    .carousel-container img {
      height: 180px; /* Tamaño original solicitado */
      border-radius: 12px;
      transition: .3s ease;
      cursor: pointer;
      box-shadow: 0 8px 20px rgba(0,0,0,.4);
      object-fit: cover;
    }

    .carousel-container img:hover {
      transform: scale(1.05);
    }

    /* TABLE SECTION */
    .table-section {
      padding: 1.5rem;
      border-radius: 16px;
      background: var(--card-bg);
      border: 1px solid var(--border-color);
      box-shadow: 0 10px 30px rgba(0,0,0,.3);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border-radius: 10px;
      overflow: hidden;
    }

    thead { background: rgba(255,255,255,.05); }

    th {
      text-align: left;
      padding: 1rem;
      font-weight: 600;
      font-size: .85rem;
      color: var(--text-muted);
    }

    td {
      padding: 1rem;
      border-top: 1px solid rgba(255,255,255,.05);
      color: #e2e8f0;
    }

    tbody tr { transition: .2s; }
    tbody tr:hover { background: rgba(108,99,255,.1); }

    /* SCROLLBAR */
    ::-webkit-scrollbar { height: 8px; width: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb {
      background: var(--primary);
      border-radius: 10px;
    }

    /* MOBILE */
    @media(max-width:768px){
      .page { padding: 1rem; }
      .filters { flex-direction: column; gap: 1rem; }
      .carousel-container img { height: 140px; }
      h1 { font-size: 1.8rem; }
    }
  `]

})
export class CatBreedsComponent implements OnInit {
  breeds = signal<Breed[]>([]);
  images = signal<CatImage[]>([]);
  selectedBreed = signal<Breed | null>(null);

  search$ = new Subject<string>();
  searchTerm = toSignal(
    this.search$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ),
    { initialValue: '' }
  );

  selectedBreedId: string | null = null;

  filteredBreeds = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();

    if (!term) {
      return this.breeds();
    }

    return this.breeds().filter(b =>
      b.name.toLowerCase().includes(term)
    );
  });


  constructor(private catService: CatService) {}

  ngOnInit(): void {
    this.catService.getBreeds().subscribe({
      next: (breeds) => this.breeds.set(breeds),
      error: () => {
        // En una prueba real se manejaría mejor el error (toast, etc.)
      }
    });
  }

  onBreedChange(): void {
    const breed = this.selectedBreedId;
    if (!breed) {
      this.images.set([]);
      return;
    }

    this.catService.getBreedById(breed).subscribe({
      next: (breed) => this.selectedBreed.set(breed),
      error: () => this.selectedBreed.set(null)
    });

    this.catService.getImagesByBreedId(breed).subscribe({
      next: (images) => this.images.set(images),
      error: () => this.images.set([])
    });
  }
}

