import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Character } from '../types/character.type';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private _http = inject(HttpClient);

  public search(params: { name: string }): Observable<Character[]> {
    return this._http
      .get<Record<string, unknown>>('https://rickandmortyapi.com/api/character', { params })
      .pipe(map((response: Record<string, unknown>) => response['results'] as Character[]));
  }
}
