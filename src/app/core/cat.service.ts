import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Breed {
  id: string;
  name: string;
  origin?: string;
  temperament?: string;
  intelligence?: number;
  description?: string;
}

export interface CatImage {
  id: string;
  url: string;
}

@Injectable({ providedIn: 'root' })
export class CatService {
  private readonly apiBase = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getBreeds(): Observable<Breed[]> {
    return this.http.get<Breed[]>(`${this.apiBase}/breeds`);
  }

  getBreedById(breedId: string): Observable<Breed> {
    return this.http.get<Breed>(`${this.apiBase}/breeds/${breedId}`);
  }

  searchBreeds(term: string): Observable<Breed[]> {
    return this.http.get<Breed[]>(`${this.apiBase}/breeds/search`, {
      params: { q: term }
    });
  }

  getImagesByBreedId(breedId: string): Observable<CatImage[]> {
    return this.http.get<CatImage[]>(`${this.apiBase}/imagesbybreedid`, {
      params: { breed_id: breedId }
    });
  }
}

