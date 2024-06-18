import { NgClass } from '@angular/common';
import { Component, inject, model, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { debounceTime, finalize } from 'rxjs';

import { setQueryParams } from '../../../../shared/utils/set-query-params';
import { CardComponent } from '../../../../ui/card/card.component';
import { IsFavoritePipe } from '../../../favorites/pipes/is-favorite.pipe';
import { FavoritesService } from '../../../favorites/services/favorites.service';
import { CharacterCardComponent } from '../../components/character-card/character-card.component';
import { CharactersService } from '../../services/characters.service';
import { Character } from '../../types/character.type';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [CardComponent, FormsModule, CharacterCardComponent, NgClass, IsFavoritePipe],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
})
export class CharactersComponent implements OnInit {
  public search = model('');

  public items = signal<Character[] | undefined>(undefined);

  private _activatedRoute = inject(ActivatedRoute);

  private _setQueryParams = setQueryParams();

  private _service = inject(CharactersService);

  public ngOnInit(): void {
    this._activatedRoute.queryParams.pipe(debounceTime(300)).subscribe(({ search }) => {
      this.search.set(search || '');
      this.items.set(undefined);

      if (search) {
        this._searchCharacters();
      } else {
        this.items.set([]);
      }
    });
  }

  public changeParams(params: Params): void {
    this._setQueryParams.set(params);
  }

  private _searchCharacters(): void {
    this._service
      .search({
        name: this.search(),
      })
      .subscribe({
        next: response => this.items.set(response),
        error: () => this.items.set([]),
      });
  }
}
