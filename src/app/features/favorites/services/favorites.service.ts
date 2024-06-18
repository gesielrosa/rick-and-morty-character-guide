import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { map } from 'rxjs';

import { localStorageSignal } from '../../../shared/utils/local-storage-signal';
import { Character } from '../../characters/types/character.type';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  public favorites = signal<Character[] | undefined>(undefined);

  public count = computed<number>(() => this._favoriteIds().length || 0);

  private _favoriteIds = localStorageSignal<number[]>('FAVORITES', []);

  private _http = inject(HttpClient);

  constructor() {
    this._fetch();
  }

  public add(id: number): void {
    const isFavorite = this.isFavorite(id);

    if (!isFavorite) {
      this._favoriteIds.update(favorites => [...favorites, id]);
      this._fetch();
    }
  }

  public remove(id: number): void {
    this._favoriteIds.update(favorites => favorites.filter(favorite => favorite !== id));
    this.favorites.set(this.favorites()!.filter(favorite => favorite.id !== id));
  }

  public toggle(id: number): void {
    const isFavorite = this.isFavorite(id);

    if (isFavorite) {
      this.remove(id);
    } else {
      this.add(id);
    }
  }

  public isFavorite(id: number): boolean {
    return this._favoriteIds().includes(id);
  }

  private _fetch(): void {
    if (!this._favoriteIds().length) {
      this.favorites.set([]);
      return;
    }

    this._http
      .get<Character | Character[]>(`https://rickandmortyapi.com/api/character/${this._favoriteIds().join(',')}`)
      .pipe(map(response => (Array.isArray(response) ? response : [response])))
      .subscribe({
        next: characters => this.favorites.set(characters),
        error: () => this.favorites.set([]),
      });
  }
}
