import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Character } from '../types/character.type';
import { Response } from '../types/response.type';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private _http = inject(HttpClient);

  public search(params: { name: string; page: number }): Observable<Response<Character>> {
    return this._http.get<Response<Character>>(`${environment.API_URL}/character`, { params });
  }
}
